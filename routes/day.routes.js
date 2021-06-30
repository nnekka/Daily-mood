const express = require('express');
const { check } = require('express-validator');
const {getTokenFromRequest} = require('../middleware/authMiddleware.js');
const dayController = require('../controllers/day.controller');
const router = express.Router();


router.route('/').get(getTokenFromRequest, dayController.getCalendars);


module.exports = router;