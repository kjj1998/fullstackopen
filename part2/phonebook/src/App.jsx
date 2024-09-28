import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`
    }

    const duplicate = persons.find((person) => person.name === newName)

    if (duplicate) {
      const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (replace) {
        phonebookService
          .update(duplicate.id, personObject)
          .then(returnedPerson => {
            setPersons(
              persons.map(person => {
                return person.id === duplicate.id ? returnedPerson : person
              })
            )
          })
      }
    } else {
      phonebookService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = id => {
    const personToBeDeleted = persons.find(person => person.id === id)
    const decision = window.confirm(`Delete ${personToBeDeleted.name}`)

    if (decision) {
      phonebookService
      .remove(id)
      .then(removedPerson =>
        setPersons(persons.filter(person => person.id !== removedPerson.id))
      )
      .catch(() => {
        alert(
          `the person '${personToBeDeleted.name}' was already deleted from server`
        )
        setPersons(persons.filter(person => person.id !== personToBeDeleted.id))
      })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleTermChange = (event) => setSearchTerm(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleTermChange={handleTermChange} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons searchTerm={searchTerm} persons={persons} removePerson={removePerson} />
    </div>
  )
}

export default App