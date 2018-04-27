const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

mongoose.connect('mongodb://omar:12345@ds159459.mlab.com:59459/auth')
const db = mongoose.connection

// handle mongo error
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log("we're connected!")
})

// parse incoming requests
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// include routes
const routes = require('./routes/router')
app.use('/api', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('File Not Found')
  err.status = 404
  next(err)
})

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.send(err.message)
})

// listen on port 3000
app.listen(PORT, function () {
  console.log('Express app listening on port 3000')
})
