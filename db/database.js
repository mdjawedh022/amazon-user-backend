const mongoose = require('mongoose')
require('dotenv').config()

const connection = mongoose.connect(process.env.MongooDB_url)


module.exports = connection