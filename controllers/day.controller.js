const User = require('../models/User.js');
const Day = require('../models/Day.js');
const Calendar = require('../models/Calendar');
const {validationResult} = require('express-validator');
const {
    error500Handler,
    error400Message,
    error404Message,
    error401Message
} = require('../utils/errorHandler.js');

module.exports.getCalendars = async (req, res) => {
    const calendars = await Calendar.find({
        user: req.user.id
    });
    res.json(calendars);
}
