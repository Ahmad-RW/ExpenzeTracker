const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: String,
    password: String,
    email: String,
    monthlyIncome : {
        amount : {type:Number, default:0},
        payrollDate : String,
    },
    balance : Number,
    catagory: [{
        name: String,
        balance: Number,
        share : Number,
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
        }]
    }]
})

const User = mongoose.model('User', UserSchema)

module.exports = User