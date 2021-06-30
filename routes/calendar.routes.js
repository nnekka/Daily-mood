const express = require('express');
const { check } = require('express-validator');
const {getTokenFromRequest} = require('../middleware/authMiddleware.js');
const calendarController = require('../controllers/calendar.controller');
const router = express.Router();


router.route('/').get(getTokenFromRequest, calendarController.getCalendars);
router.route('/:id').get(getTokenFromRequest, calendarController.getCalendarById);
router.route('/:id').put([
    check('title', 'Title is required!').not().isEmpty()
], getTokenFromRequest, calendarController.updateCalendar);
router.route('/').post([
    check('title', 'Title is required!').not().isEmpty(),
    check('legendType', 'Legend type is required!').not().isEmpty()
], getTokenFromRequest, calendarController.createCalendar);

module.exports = router;