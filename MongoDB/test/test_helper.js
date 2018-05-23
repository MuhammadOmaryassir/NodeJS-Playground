const mongoose = require('mongoose')
mongoose.Promise = global.Promise // change mongoose promise with ES6 Promise

before((done) => {
  mongoose.connect('mongodb://localhost/users_test')
  mongoose.connection
  // Events
    .once('open', () => done())
    .on('error', (error) => console.warn('warning', error))
})

// function that run before each test
beforeEach((done) => { // done is a function make sure that the process is completed
  mongoose.connection.collections.users.drop(() => done()) // empty the DataBase befor runing any test
})
