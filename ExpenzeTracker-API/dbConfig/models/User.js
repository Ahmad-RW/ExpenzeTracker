const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: String,
    password: {type:String},
    email: {type:String, index:{unique:true}},
    monthlyIncome : {
        amount : {type:Number, default:0},
        payrollDate : String,
    },
    balance : Number,
    category: [{
        name: String,
        deleted : {type:Boolean, default:false},
        balance: Number,
        share : Number,
    }],
    logs:[{
        action : {
            type: String,
            enum: ['TRANSFER', 'INCOME', 'EXPENSE']
        },
        to:{type: mongoose.Schema.Types.ObjectId, default : null},
        from : {type: mongoose.Schema.Types.ObjectId, default : null},
        category_id: {type: mongoose.Schema.Types.ObjectId, default : null},
        amount : Number,
        timeStamp : Date
    }]
})

const User = mongoose.model('User', UserSchema)

module.exports = User