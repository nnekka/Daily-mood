const express = require('express');
const {getTokenFromRequest} = require('../middleware/authMiddleware.js');
const supController = require('../controllers/sup.controller');
const router = express.Router();


router.route('/title-validator').get(getTokenFromRequest, supController.getTitles);

module.exports = router;