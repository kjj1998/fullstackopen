require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('body', res => JSON.stringify(res.body))

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const getFormattedDate = () => {
  const options = {
    timeZone: 'Asia/Singapore',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  
  const now = new Date();
  const formattedDate = now.toLocaleString('en-US', options) + ' GMT+0800 (Singapore Standard Time)';

  return formattedDate
}

const checkExist = (name, persons) => {
  const exist = persons.find(person => {
    return person.name === name 
  })

  return exist ? true : false
}

const generateId = () => {
  return Math.floor(Math.random() * 12340230493)
}

app.get('/info', (request, response) => {
  const formattedDate = getFormattedDate()

  response.send(`<div>
    Phonebook has info for ${persons.length} people
    <br/>
    ${formattedDate}
  </div>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(request => {
      return response.json(request).status(204).end()
    })
    .catch(error => {
      console.log(error)
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      'error': 'name/number missing'
    })
  }

  // if (checkExist(body.name, persons)) {
  //   return response.status(400).json({
  //     'error': 'name must be unique'
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
 
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})