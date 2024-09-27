const Persons = ({ persons, searchTerm, removePerson }) => {
  const value = persons.length === 0 
    ? '...' 
    : persons.map(person => {
      if (person.name.includes(searchTerm) || searchTerm === '') {
        return (
          <div key={person.id}>
            {person.name} {person.number} <button onClick={() => removePerson(person.id)}>delete</button>
          </div>
        )
      }
  })

  return value
}

export default Persons