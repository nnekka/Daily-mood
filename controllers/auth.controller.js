const User = require('../models/User.js');
const { generateToken } = require('../utils/generateToken.js');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const {
    error500Handler,
    error400Message,
    error404Message,
    error401Message
} = require('../utils/errorHandler.js');

module.exports.getUsers = async (req, res) => {
    const users = await User.find({}).select('-password')
    res.json(users)
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const passwordCorrect = user
            ? await bcrypt.compare(password, user.password)
            : false;
        if (!user || !passwordCorrect){
            return error401Message(res, 'Wrong credentials')
        }
        const token = generateToken(user._id);
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: `Bearer ${token}`
        })
    }
    catch (e) {
        error500Handler(res, e)
    }
}

module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const { name, email, password, avatar } = req.body;

        const existUser = await User.findOne({ email });

        if(existUser){
            return error400Message(res, 'Email is already taken')
        }

        const salt = await bcrypt.genSaltSync(10);
        const passwordHash = await bcrypt.hashSync(password, salt);
        const user = new User({
            name,
            email,
            password: passwordHash,
            avatar
        })
        await user.save();
        const token = generateToken(user._id);
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: `Bearer ${token}`
        })
    }

    catch (e) {
        error500Handler(res, e)
    }
}

module.exports.getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user){
            return error404Message(res, 'User not found')
        }
        res.json(user)
    }
    catch (e) {
        error500Handler(res, e)
    }
}

module.exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return error404Message(res, 'User not found')
        } else {
            user.name = req.body.name ? req.body.name : user.name;
            if (req.body.avatar){
                user.avatar = req.body.image
            }
            const updated = await user.save();
            res.json(updated)
        }
    }
    catch (e) {
        error500Handler(res, e)
    }
}