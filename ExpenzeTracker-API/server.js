const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('./dbConfig/dbCon')
const User = require('./dbConfig/models/User')
const account = require('./account')
const getUserDto = require('./dbConfig/models/UserDto')
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});

app.use(bodyParser.json());// post request body parser
app.use("/account", account)

function getDate() {
    var day = new Date().getDate()
    return `${day}`
}
setInterval(() => {//this executes every 5 mins(300000 millieseconds).
    console.log("checking dates...")
    var date = getDate()
    User.find({ "monthlyIncome.payrollDate": date }).cursor().eachAsync((record) => {
        console.log(`Adding monthly Income to ${record.name}`)
        let newCategoryList = addIncomeToCategories(record.category, record.monthlyIncome.amount)
        User.findByIdAndUpdate({ _id: record._id }, { $set: { "category": newCategoryList }, $inc: { "balance": record.monthlyIncome.amount }, $push: { "logs": getLog("INCOME", null, record.monthlyIncome.amount) } }, { new: true, runValidators: true }).then(() => {
            console.log("Monthly Income Added")
        })
    }).then((records) => {
    }).catch(err => {
        throw err
    })
}, 86400000)


app.get('/', function (req, res) {
    res.send('hi. In production this route will serve the react app. but for now it is a friendly reminder to stay hydrated :)')
})

app.get('/getUserData', function (req, res) {
    console.log("getting user data....")
    User.findOne({ email: req.query.email }).then((record) => {
        res.status(200).send(getUserDto(record))
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
    let newCategoryList = req.body.payload.userData.category
    newCategoryList = addIncomeToCategories(newCategoryList, req.body.payload.income);
    let logs = []
    newCategoryList.forEach(elem=>{
        if(elem.deleted){return}
        let log = getLog("INCOME", elem._id, ((req.body.payload.income*elem.share)/100))
        logs.push(log)


    })
    console.log(req.body)
    User.findByIdAndUpdate({ _id: req.body.payload.userData._id }, { $set: { "category": newCategoryList }, $inc: { "balance": req.body.payload.income }, $push: { "logs":{$each:logs} }}, { new: true, runValidators: true }).then(record => {

        res.status(200).send(record)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })

})

app.post('/editCategories', function (req, res) {
    console.log("editing categories...")
    const newCategoryList = req.body.payload.userData.category
    newCategoryList.forEach(cat => {// I use javascript to update the categores instead of mongoDB queries, it is easier since mongoDB accepts JS.
        cat.share = req.body.payload.categories[cat._id]
        if (typeof cat.share === "undefined") {//this  is for when he doesn't enter anything in the front end, it is sent as undefined rather than 0, so I set it 0 here so I dont store undefined in the DB
            cat.share = 0
        }
    })
    User.findByIdAndUpdate({ _id: req.body.payload.userData._id }, { $set: { "category": newCategoryList } }, { new: true }).then(record => {
        res.status(200).send(record)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})


app.post('/deleteCategory', function (req, res) {
    console.log("editing categories...")
    let newCategoryList = req.body.payload.userData.category.map(element => {
        if (element._id === req.body.payload.category._id) {
            element.deleted = true;
        }
        return element
    })

    newCategoryList = addIncomeToCategories(newCategoryList, req.body.payload.category.balance)

    User.findByIdAndUpdate({ _id: req.body.payload.userData._id }, { $set: { "category": newCategoryList } }, { new: true }).then(record => {
        res.status(200).send(record)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

app.post('/handleRename', function (req, res) {
    User.findByIdAndUpdate({ _id: req.body.payload.userData._id }, { $set: { "category.$[elem].name": req.body.payload.newName } }, { new: true, arrayFilters: [{ "elem._id": mongoose.Types.ObjectId(req.body.payload.categoryId) }] }).then(function (record) {
        res.status(200).send(record)
    }).catch(function (err) {
        res.status(500).send(err)
    })
})


app.post('/submitExpense', function (req, res) {
    console.log("submiting eexpense.....")
    let newCategoryList = req.body.payload.userData.category.map(element => {
        if (element._id === req.body.payload.category_id) {
            element.balance = element.balance - req.body.payload.amount
        }
        return (element)
    })

    User.findByIdAndUpdate({ _id: req.body.payload.userData._id }, { $set: { "category": newCategoryList }, $push: { "logs": getLog("EXPENSE", req.body.payload.category_id, req.body.payload.amount) } }, { new: true, runValidators: true }).then(record => {
        res.status(200).send(record)
    }).catch(err => {
        res.status(500).send(err)
    })
})

app.post('/handleTransfer', function (req, res) {
    let log = getLog("TRANSFER", null, req.body.payload.amount)
    log.to = req.body.payload.to
    log.from = req.body.payload.from
    User.findByIdAndUpdate({ _id: req.body.payload.userData._id }, { $inc: { "category.$[to].balance": req.body.payload.amount, "category.$[from].balance": -req.body.payload.amount }, $push: { "logs": log } }, { new: true, arrayFilters: [{ "to._id": mongoose.Types.ObjectId(req.body.payload.to) }, { "from._id": mongoose.Types.ObjectId(req.body.payload.from) }] }).then(function (record) {
        res.status(200).send(record)
    }).catch(function (err) {
        res.status(500).send(err)
    })
})

app.listen('5000', function () {
    console.log('listening on port 5000')
})

app.get('/testingMongoDB', function (req, res) {
    //5ccd6cebb0e9f55fe072991e
    //5cedcad01c9d440000a39592
    User.findByIdAndUpdate({ _id: "5cedcad01c9d440000a39592" }, { $set: { "category": [] } }).then(record => {
        res.status(200).send("efefwef")
    })
})


function addIncomeToCategories(newCategoryList, amount) {
     newCategoryList.forEach(cat => {
        cat.balance = cat.balance + (amount * (cat.share / 100));
    });
    return newCategoryList
}


function getLog(action, category_id, amount) {
    const log = {
        action,
        category_id,
        amount,
        timeStamp: new Date()
    }
    return log
}

