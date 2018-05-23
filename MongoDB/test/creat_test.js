const assert = require('assert')
const User = require('../src/user')

// descripe function 'built in in Mocha'
describe('Creating Records', () => {

  // it used to Docment and describe what is test about 'built in in Mocha'
  it('Saves a user', (done) => {

    const Omaroovee = new User({name: 'Muhammad Omar'}) // Creat a new user
    Omaroovee.save() // save it to the DB
      .then((result) => { // creat a test to check if it saved or no
        assert(!Omaroovee.isNew)
        done()
      })
  })
})

