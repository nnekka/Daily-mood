const express = require('express');
const cors = require('cors');
const colors = require('colors');
const morgan = require('morgan');
const { connectToMongo } = require('./utils/connect');
const userRoutes = require('./routes/auth.routes');
const uploadRoutes = require('./routes/uploadRoutes.js');
const calendarRoutes = require('./routes/calendar.routes.js');
const dayRoutes = require('./routes/day.routes.js');
const supRoutes = require('./routes/sup.routes.js');

connectToMongo();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/calendars', calendarRoutes);
app.use('/api/days', dayRoutes);
app.use('/api/supporting', supRoutes);
app.use('/uploads', express.static('uploads'));


module.exports = app;