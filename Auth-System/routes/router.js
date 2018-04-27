const express = require('express')
const app = express()
const User = require('../models/schema')

// POST route for updating data
app.post('/register', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    let err = new Error('Passwords do not match.')
    err.status = 400
    res.send('passwords dont match')
    return next(err)
  }

  if (req.body.email &&
    req.body.username &&
    req.body.number &&
    req.body.password &&
    req.body.passwordConf) {
    let userData = {
      email: req.body.email,
      username: req.body.username,
      number: req.body.number,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    }
    console.log(userData)
    User.create(userData, function (error, user) {
      if (error) {
        return next(error)
      } else { res.send(user) }
    })
  }
})

app.post('/login', function (req, res, next) {
  if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        let err = new Error('Wrong email or password.')
        err.status = 401
        return next(err)
      } else {
        res.send('done')
      }
    })
  } else {
    let err = new Error('All fields required.')
    err.status = 400
    return next(err)
  }
})

module.exports = app
