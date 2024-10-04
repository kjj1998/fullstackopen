require('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

morgan.token('body', res => JSON.stringify(res.body))

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/info', (request, response) => {
  Person.countDocuments({})
    .then(count => {
      const formattedDate = getFormattedDate()
      response.send(`<div>
        Phonebook has info for ${count} people
        <br/>
        ${formattedDate}
      </div>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {

  Person.findOne({ _id: request.params.id })
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(request => {
      return response.json(request).status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      'error': 'name/number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
 
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      'error': 'name/number missing'
    })
  }

  const updatedPerson = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(request.params.id, updatedPerson, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name == 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})