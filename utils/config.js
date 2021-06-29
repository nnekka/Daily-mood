const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 9999;
const MONGO_URI = process.env.MONGO_URI;
const SECRET = process.env.SECRET;

module.exports = { PORT, SECRET, MONGO_URI }