const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./dbConfig/dbCon')
const Catagories = require('./dbConfig/models/Catagories')
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    
});

app.use(bodyParser.json());// post request body parser


app.get('/', function(req,res){
    res.send('hi. In production this route will server the react app. but for now it is a friendly reminder to stay hydrated :)')
})

app.get('/testingMongoDB', function(req,res){
    //mongoose.connect('mongodb+srv://ahmed:ahmed123456789@cluster0-kb7x7.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    console.log('creating dummy conllection...')
    const obj = {
        name :"gas",
        balance : 83,
        actions :[{
            Type:'TRANSFER',
            timeStamp : new Date(),
            amount : 80,
            in : true,
            to : "gas",
            from : "emergency"
        }]
    }
    
    Catagories.create([obj]).then(function(record){
        res.status(200).send(record)
    }).catch(function(err){
        res.status(500).send(err)
    })
})









app.listen('5000', function(){
    console.log('listening on port 5000')
})