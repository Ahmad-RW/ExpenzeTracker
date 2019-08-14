const express = require('express')
const account = express.Router()
const passport = require('passport')
const Users = require('./dbConfig/models/User')
const SG_API_KEY = "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"
const mailClient = require('@sendgrid/mail')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
mailClient.setApiKey(SG_API_KEY)

account.post("/register", function (req, res) {
  const user = { email: req.body.payload.email, password: req.body.payload.password, name: req.body.payload.username }
  Users.create(user).then(function (record) {
    console.log(req.protocol, req.get('host'))
    var callbackUrl = `${req.protocol}://${req.get('host')}/account/confirmEmail?code=${record.confirmationCode}&user=${record.email}`;
    console.log(callbackUrl)


    const confrimationMessage = {
      to: user.email,
      from: "expenzeTracker@hello.com",
      subject: "please confirm your email with expenze tracker",
      text: "hi hi hi hih ihihih i",
      html: ` <b> hello please confirm your email by clicking <a href=${callbackUrl}>here</a> </b>`
    }

    mailClient.send(confrimationMessage).then(function () {
      res.status(201).send()
    })
  }).catch(function (err) {
    console.log(err)
    res.status(409).send(err)
  })
})

account.post("/login", function (req, res) {
  Users.findOne({ "email": req.body.payload.email }).then(function (record) {
    console.log(record)
    if (record === null) {
      res.status(401).send()
    }
    if (!record.emailConfirmed) {
      res.status(403).send()
    }
   var result = bcrypt.compareSync(req.body.payload.password, record.password)
   if(result){
    res.status(200).send(record)
   }
   else{
    res.status(401).send()
   }
  }).catch(function (err) {
    console.log(err)
  })
})

account.get('/test', function (req, res) {

  var callbackUrl = `${req.protocol}://${req.get('host')}/account/confirmEmail?code=1&user=1`;
  console.log(callbackUrl)
  const confrimationMessage = {
    to: "ahmed-rw@outlook.com",
    from: "expenzeTracker@hello.com",
    subject: "please confirm your email with expenze tracker",
    text: "hi hi hi hih ihihih i",
    html: ` <b> hello please confirm your email by clicking <a id=hi style='color:blue;' href=${callbackUrl}>here</a> </b>`
  }

  mailClient.send(confrimationMessage).then(function () {
    res.send()
  })

})

account.get("/confirmEmail", function (req, res) {
  const userEmail = req.query.user
  const code = req.query.code
  Users.findOne({ "email": userEmail }).then(function (record) {
    if (record === null) {
      res.status(404).send()
    }
    if (record.confirmationCode === code) {
      Users.findOneAndUpdate({ "email": userEmail }, { $set: { "emailConfirmed": true } }).then(function (record) {
        res.status(200).redirect("http://localhost:3000/account/emailConfirmed")
      })
    }
    else {
      res.status(403).send()
    }
  })
})


module.exports = account