import { useState, useEffect } from 'react'
import countryService from '../services/country'
import CountryCard from './CountryCard'

const Display = ({ searchTerm, countries, setSearchTerm }) => {
  const [displayContent, setDisplayContent] = useState(null);

  useEffect(() => {
    const fetchDisplay = async () => {
      const matches = filterCountry(searchTerm);
      const result = await display(matches);
      setDisplayContent(result);
    };

    fetchDisplay();
  }, [searchTerm, countries]);

  const filterCountry = (searchTerm) => {
    if (searchTerm === '')
      return []  
    
    return countries.filter(country => country.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  const showCountryCard = (match) => {
    setSearchTerm(match)
  }

  const display = async (matches) => {
    if (matches.length > 10) {
      return <div>Too many matches, specify another filter</div>
    } else if (matches.length === 1) {
      const country = await countryService.search(matches[0])
      const languages = Object.keys(country.languages).reduce((acc, key) => {
        acc.push(country.languages[key])
        return acc
      }, [])

      return (
        <CountryCard 
          name={country.name.common}
          capital={country.capital[0]}
          area={country.area}
          languages={languages}
          flag={country.flags.png}
        />
      )
    }
    else {
      return (
        <div>
          {matches.map(match => {
             return (
              <div key={match}>
                {match} <button onClick={() => showCountryCard(match)}>show</button>
              </div>
            )
          })}
        </div>
      )
    }
  }

  return (
    <div>{displayContent}</div>
  )
}

export default Display