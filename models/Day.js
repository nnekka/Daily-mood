const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    day: { type: Number, required: true },
    month: { type: Number, required: true },
    calendar: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Calendar'
        }
    ],
    legend: {
        src: String,
        text: String
    }
}, {
    timestamps: true
})


const Day = mongoose.model('Day', schema);
module.exports = Day;