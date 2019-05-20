const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./dbConfig/dbCon')
const User = require('./dbConfig/models/User')
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});

app.use(bodyParser.json());// post request body parser


app.get('/', function (req, res) {
    res.send('hi. In production this route will serve the react app. but for now it is a friendly reminder to stay hydrated :)')
})

app.get('/getUserData', function (req, res) {
    User.findOne({email : req.query.email}).then((record) => {
        console.log(record)
        res.status(200).send(record)
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
})
app.get('/testingMongoDB', function (req, res) {
    //mongoose.connect('mongodb+srv://ahmed:ahmed123456789@cluster0-kb7x7.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    console.log('creating dummy conllection...')
    const obj = {
        name: 'dummy',
        email: 'dummy@dummy.com',
        catagory: [{
            name: "gas",
            balance: 83,
            actions: [{
                Type: 'TRANSFER',
                timeStamp: new Date(),
                amount: 80,
                in: true,
                to: "gas",
                from: "emergency"
            }]
        }]

    }

    User.create([obj]).then(function (record) {
        res.status(200).send(record)
    }).catch(function (err) {
        res.status(500).send(err)
    })
})


app.post('/newCatagory', function (req, res) {
    console.log(req.body)
    const newCatagory = {//when he creates a new catagory we only have it's name and it's balance(which is defaulted to 0)
        name: req.body.payload.catagoryName,
        balance: 0,
        actions: []
    }
    User.findOneAndUpdate({ email: req.body.payload.userData.email }, { $push: { catagory: newCatagory } }, { new: true }).then((record) => {
        res.status(200).send(record)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.post('/setUserIncome', function(req,res){
    console.log(req.body.payload)
    User.findByIdAndUpdate({_id:req.body.payload.userData._id}, {$set:{monthlyIncome:req.body.payload.value}}, {new : true}).then(record=>{
        res.status(200).send(record)
    }).catch(err=>{
        res.status(500).send(err)
    })
})





app.listen('5000', function () {
    console.log('listening on port 5000')
})