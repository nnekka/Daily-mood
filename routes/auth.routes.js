const express = require('express');
const { check } = require('express-validator');
const {getTokenFromRequest} = require('../middleware/authMiddleware.js');
const userController = require('../controllers/auth.controller');
const router = express.Router()


router.route('/').get(userController.getUsers)
router.route('/login').post(userController.login)
router.route('/profile').get(getTokenFromRequest, userController.getUserById)
router.route('/register').post([
    check('password', 'Enter password with 6 and more characters').isLength({min: 6}),
    check('email', 'Email must be email!').isEmail()
], userController.register)
router.route('/:id').put(getTokenFromRequest, userController.updateUserProfile)


module.exports = router