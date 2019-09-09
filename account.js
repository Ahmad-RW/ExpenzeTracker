const express = require('express')
const account = express.Router()
const Users = require('./dbConfig/models/User')
const SG_API_KEY = "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"
const mailClient = require('@sendgrid/mail')
const bcrypt = require('bcryptjs')
const getUserDto = require('./dbConfig/models/UserDto')
const bcryptjs = require('bcryptjs')
const nodemailer = require('nodemailer')
mailClient.setApiKey(SG_API_KEY)

account.post("/register", function (req, res) {
  const user = { email: req.body.payload.email, password: req.body.payload.password, name: req.body.payload.username }
  Users.create(user).then(function (record) {
    var callbackUrl = `${req.protocol}://${req.get('host')}/account/confirmEmail?code=${record.confirmationCode}&user=${record.email}`;


    // const confrimationMessage = {
    //   to: user.email,
    //   from: "expenzeTracker@hello.com",
    //   subject: "please confirm your email with expenze tracker",
    //   text: "hi hi hi hih ihihih i",
    //   html: ` <b> hello please confirm your email by clicking <a href=${callbackUrl}>here</a> </b>`
    // }

    // mailClient.send(confrimationMessage).then(function () {
    //   res.status(201).send()
    // })
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user:"expenzetracker@gmail.com", // generated ethereal user
          pass: "expenze123123123" // generated ethereal password
      },
      tls: {
          rejectUnauthorized: false
      }
  });

  // send mail with defined transport object
  let info =  transporter.sendMail({
      from: '"Expenze Tracker" <expenzetracker@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Email Confirmation", // Subject line
      text: '', // plain text body
      html: `<b> hello please confirm your email by clicking <a href=${callbackUrl}>here</a> </b>` // html body
  }).then(function(){
    res.status(201).send()
  }).catch(function(err){
      console.log(err)
  })
  }).catch(function (err) {
    console.log(err)
    res.status(409).send(err)
  })
})

account.post("/login", function (req, res) {
  Users.findOne({ "email": req.body.payload.email }).then(function (record) {
    if (record === null) {
      res.status(401).send()
    }
    if (!record.emailConfirmed) {
      res.status(403).send()
    }
   var result = bcrypt.compareSync(req.body.payload.password, record.password)
   if(result){
    res.status(200).send(getUserDto(record))
   }
   else{
    res.status(401).send()
   }
  }).catch(function (err) {
    console.log(err)
  })
})

account.post("/changepassword", function(req,res){
  Users.findOne({"email": req.body.payload.userData.email}).then(function(record){
    if(record === null){
      res.status(404).send()
    }
    if( bcrypt.compareSync(req.body.payload.password, record.password)){
      Users.findOneAndUpdate({"email": req.body.payload.userData.email}, {$set:{password:bcryptjs.hashSync(req.body.payload.newPassword, 10)}}).then(function(record){
        res.status(204).send()
      })
    }
    else{
      res.status(401).send()
    }
  }).catch(function(err){
    console.log(err)
    res.status(500).send()
  })
})

account.get('/test', function (req, res) {

  var callbackUrl = `${req.protocol}://${req.get('host')}/account/confirmEmail?code=1&user=1`;
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