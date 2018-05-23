const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat new useres schema ==> to make a user Collection
const UserSchema = new Schema({
  name: String
})

// Creat the user Collection based on that Schema
const User = mongoose.model('user', UserSchema)

// export the User Module
module.exports = User
