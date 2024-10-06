const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://admin:${password}@fullstack-open-cluster.xnorb.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=fullstack-open-cluster`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const testNote = new Note({
  content: 'test1',
  important: false,
})

const testNote2 = new Note({
  content: 'test2',
  important: true
})

testNote.save()
testNote2.save()


Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})