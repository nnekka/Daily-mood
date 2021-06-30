const Calendar = require('../models/Calendar');
const {
    error500Handler,
} = require('../utils/errorHandler.js');
//контроллер для работы с дополнительными запросами
module.exports.getTitles = async (req, res) => {
    try {
        const calendars = await Calendar.find({
            user: req.user.id
        })
        if (calendars.length > 0) {
            const titles = calendars.map(item => item.title);
            res.status(200).json(titles);

        } else {
            res.status(200).json([])
        }
    }
    catch (e) {
        error500Handler(res, e);
    }
}