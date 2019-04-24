const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CatagoriesSchema = new Schema({
    name: String,
    balance: Number,
    actions: [{
        Type: {
            type: String,
            enum: ['TRANSFER', 'INCOME', 'EXPENSE']
        },
        timeStamp: Date,
        amount: Number,
        in: Boolean,
        to: String,
        from: String
    }
    ]
})

const Catagories = mongoose.model('Catagories', CatagoriesSchema)

module.exports = Catagories