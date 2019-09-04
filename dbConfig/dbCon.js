const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://ahmed:ahmed123456789@cluster0-kb7x7.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })

module.exports = mongoose

