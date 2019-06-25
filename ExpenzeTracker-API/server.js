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

function updateUserCategories(user) {
    const newCategoryList = user.category
    newCategoryList.forEach(element => {
        element.balance = element.balance + (user.monthlyIncome.amount * (element.share / 100))
    })
    return newCategoryList
}
function getDate() {
    var day = new Date().getDate()
    return `${day}`
}
setInterval(() => {//this executes every 5 mins(300000 millieseconds).
    console.log("checking dates...")
    var date = getDate()
    User.find({ "monthlyIncome.payrollDate": date }).cursor().eachAsync((record) => {
        console.log(`Adding monthly Income to ${record.name}`)
        const newCategoryList = updateUserCategories(record)
        User.findByIdAndUpdate({ _id: record._id }, { $set: { "category": newCategoryList }, $inc:{"balance" : record.monthlyIncome.amount }}, { new: true }).then(() => {
            console.log("Monthly Income Added")
        })
    }).then((records) => {
    }).catch(err => {
        throw err
    })
}, 20000)


app.get('/', function (req, res) {
    res.send('hi. In production this route will serve the react app. but for now it is a friendly reminder to stay hydrated :)')
})

app.get('/getUserData', function (req, res) {
    User.findOne({ email: req.query.email }).then((record) => {
        res.status(200).send(record)
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err)
    })
})


app.post('/newCategory', function (req, res) {
    console.log("Creating New Category...")
    const newCategory = {//when he creates a new category we only have it's name and it's balance(which is defaulted to 0)
        name: req.body.payload.categoryName,
        balance: 0,
        actions: [],
        share: 0
    }
    User.findOneAndUpdate({ email: req.body.payload.userData.email }, { $push: { category: newCategory } }, { new: true }).then((record) => {
        res.status(200).send(record)
    }).catch((err) => {
        res.status(500).send(err)
    })
})

app.post('/setUserIncome', function (req, res) {
    console.log("Setting New User Income...")
    const monthlyIncome = {
        amount: req.body.payload.amount,
        payrollDate: req.body.payload.payrollDate
    }
    User.findByIdAndUpdate({ _id: req.body.payload.userData._id }, { $set: { monthlyIncome: monthlyIncome } }, { new: true }).then(record => {
        res.status(200).send(record)
    }).catch(err => {
        res.status(500).send(err)
    })
})


app.post('/addIncome', function (req, res) {
    console.log("Adding Income...")
    const newCategoryList = req.body.payload.userData.category
    newCategoryList.forEach(cat => {
        cat.balance = cat.balance + (req.body.payload.income * (cat.share / 100))
    })
    User.findByIdAndUpdate({ _id: req.body.payload.userData._id }, { $set: { "category": newCategoryList }, $inc:{"balance" : req.body.payload.income} }, { new: true }).then(record => {
        console.log(record)
        res.status(200).send(record)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })

})

app.post('/editCategories', function(req, res){
    console.log("editing categories...")
    const newCategoryList = req.body.payload.userData.category
    newCategoryList.forEach(cat => {// I use javascript to update the categores instead of mongoDB queries, it is easier since mongoDB accepts JS.
        cat.share = req.body.payload.categories[cat._id]
        if(typeof cat.share ==="undefined"){//this  is for when he doesn't enter anything in the front end, it is sent as undefined rather than 0, so I set it 0 here so I dont store undefined in the DB
            cat.share =0
        }
    })
    User.findByIdAndUpdate({ _id: req.body.payload.userData._id }, { $set: { "category": newCategoryList }}, { new: true }).then(record => {
        res.status(200).send(record)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})


app.post('/deleteCategory', function(req, res){
    console.log("editing categories...")
    const newCategoryList = req.body.payload.userData.category.filter(element=>{
        return element._id !== req.body.payload.category._id
    })
   
    User.findByIdAndUpdate({ _id: req.body.payload.userData._id }, { $set: { "category": newCategoryList }}, { new: true }).then(record => {
        res.status(200).send(record)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})
app.listen('5000', function () {
    console.log('listening on port 5000')
})

app.get('/testingMongoDB', function (req, res) {

})


