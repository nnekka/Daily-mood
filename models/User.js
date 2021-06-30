const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({

    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' }

})


const User = mongoose.model('User', userSchema);
module.exports =  User;