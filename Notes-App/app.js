const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes.js')

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
}
const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}
// reading the command from the terminal
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  // list command
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  // remove command
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv
var command = argv._[0]

// check if the command is add
if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body)
  if (note) {
    console.log('Note created')
    notes.logNote(note)
  } else {
    console.log('Note title taken')
  }

// check if the command is list
} else if (command === 'list') {
  var allNotes = notes.getAll()
  console.log(`Printing ${allNotes.length} note(s).`)
  allNotes.forEach((note) => notes.logNote(note))

// check if the command is read  
} else if (command === 'read') {
  var note = notes.getNote(argv.title)
  if (note) {
    console.log('Note found')
    notes.logNote(note)
  } else {
    console.log('Note not found')
  }

// check if the command is  remove  
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title)
  var message = noteRemoved ? 'Note was removed' : 'Note not found'
  console.log(message)
} else {
  console.log('Command not recognized')
}
