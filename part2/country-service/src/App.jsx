import { useState, useEffect } from "react"
import countryService from './services/country'
import SearchBar from './components/SearchBar'
import Display from "./components/Display"

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(names => setCountries(names))
  }, [])

  const handleTermChange = (event) => setSearchTerm(event.target.value)
  
  return (
    <>
      <SearchBar searchTerm={searchTerm} handleTermChange={handleTermChange} />
      <Display searchTerm={searchTerm} countries={countries} />
    </>
  )
}

export default App
