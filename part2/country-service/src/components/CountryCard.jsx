const CountryCard = ({ name, capital, area, languages, flag }) => {
  return (
    <div>
      <h1>{name}</h1>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <h3>languages:</h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={flag}/>
    </div>
  )
}

export default CountryCard