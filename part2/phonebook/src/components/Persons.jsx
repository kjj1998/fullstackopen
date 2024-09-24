const Persons = ({ persons, searchTerm }) => {
  const value = persons.length === 0 
    ? '...' 
    : persons.map(person => {
      if (person.name.includes(searchTerm) || searchTerm === '') {
        return (
          <div key={person.id}>{person.name} {person.number}</div>
        )
      }
  })

  return value
}

export default Persons