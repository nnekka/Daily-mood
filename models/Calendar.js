const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    title: { type: String, required: true },
    days: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Day'
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: { type: String },
    legendType: { type: String, required: true },
    year: { type: Number, default: 2021 },
    legends: [
        {
            src: String,
            text: String
        }
    ],

}, {
    timestamps: true
})


const Calendar = mongoose.model('Calendar', schema);
module.exports = Calendar;