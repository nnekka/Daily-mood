const User = require('../models/User.js');
const Calendar = require('../models/Calendar');
const {validationResult} = require('express-validator');
const {
    error500Handler,
    error400Message,
    error404Message
} = require('../utils/errorHandler.js');

module.exports.getCalendars = async (req, res) => {
    const calendars = await Calendar.find({
        user: req.user.id
    });
    res.json(calendars);
}

module.exports.getCalendarById = async (req, res) => {
    try {
        const calendar = await Calendar.findOne({
            user: req.user.id,
            _id: req.params.id
        });
        res.json(calendar);
    }
    catch (e) {
        error500Handler(res, e);
    }
}

module.exports.createCalendar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const {title, year, description, legendType} = req.body;
        const existCalendar = await Calendar.findOne({
            title,
            user: req.user.id
        })
        if (existCalendar) {
            return error400Message(res, 'Такой календарь уже существует')
        }
        const calendar = new Calendar({
            title,
            year,
            description,
            legendType,
            user: req.user.id
        })
        await calendar.save()
        res.status(201).json(calendar)

    }
    catch (e) {
        error500Handler(res, e);
    }
}


// module.exports.removeCalendar = async (req, res) => {
//     try {
//         const calendar = await Calendar.findOne({
//             user: req.user.id,
//             _id: req.params.id
//         });
//         res.json(calendar);
//     }
//     catch (e) {
//         error500Handler(res, e);
//     }
// }

module.exports.updateCalendar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const { title, description, year } = req.body
        const exist = await Calendar.findOne({ title });
        if (exist){
            return error400Message(res, `Calendar with title ${title} is already exists`)
        }
        const calendar = await Calendar.findOne({
            _id: req.params.id
        })
        if (!calendar){
            return error404Message(res, 'Calendar not found')
        }
        calendar.title = title;
        if (description){
            calendar.description = description;
        }
        if (year){
            calendar.year = year;
        }

        await calendar.save()
        res.status(200).json(calendar)
    }
    catch (e) {
        error500Handler(res, e);
    }
}

// module.exports.addLegend = async (req, res) => {
//     try {
//         const calendar = await Calendar.findOne({
//             user: req.user.id,
//             _id: req.params.id
//         });
//         res.json(calendar);
//     }
//     catch (e) {
//         error500Handler(res, e);
//     }
// }
