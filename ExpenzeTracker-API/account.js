const express = require('express')
const account = express.Router()
const passport  = require('passport')
const Users = require('./dbConfig/models/User')

account.post("/register", function(req, res){
  const user = {email : req.body.payload.email, password:req.body.payload.password, name : req.body.payload.username}
  Users.create(user).then(function(record){
    console.log(record)
    res.status(201).send()

  }).catch(function(err){
    console.log(err)
    res.status(409).send(err)
  })
})




module.exports = account