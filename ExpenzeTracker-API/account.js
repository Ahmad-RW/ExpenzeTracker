const express = require('express')
const account = express.Router()
const passport = require('passport')
const Users = require('./dbConfig/models/User')

account.post("/register", function (req, res) {
  const user = { email: req.body.payload.email, password: req.body.payload.password, name: req.body.payload.username }
  Users.create(user).then(function (record) {
    console.log(record)
    res.status(201).send()

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
    if (record.password === req.body.payload.password) {
      res.status(200).send(record)
    }
    else{
      res.status(401).send()
    }
  }).catch(function(err){
    console.log(err)
  })
})


module.exports = account