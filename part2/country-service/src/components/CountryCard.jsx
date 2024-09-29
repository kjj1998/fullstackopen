const CountryCard = ({ name, capital, area, languages, flag, temp, icon, windSpeed }) => {
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
      <h2>Weather in {capital}</h2>
      <div>temperature {temp} Celcius</div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
      <div>wind {windSpeed} m/s</div>
    </div>
  )
}

export default CountryCard