import { useEffect, useState } from "react"
import countryServices from '../Services/countries'

const CountryDetails = ({ country }) => {
  const [weatherDetails, setWeatherDetails] = useState({})
  useEffect(()=>{
    countryServices.getCountryWeather(country.capitalInfo.latlng[0],country.capitalInfo.latlng[1])
    .then((response)=>{
      setWeatherDetails(response)
    })
    .catch((response) => 
    console.log('something happened with the api call',response)
    )
  },[])
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital?.[0] || 'N/A'}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {country.languages
          ? Object.values(country.languages).map(language => <li key={language}>{language}</li>)
          : <li>No languages available</li>}
      </ul>
      <img src={country.flags.png}/>
      <h2>Weather in {country.name.common}</h2>
      {(Object.keys(weatherDetails).length === 0)?'Theres no data for this location': <div><p>Temperature {weatherDetails.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png`}/>
      <p>Wind {weatherDetails.wind.speed} m/s</p> 
      </div>}
    </div>
)}

const CountryList = ({ countries, onClick }) => (
  <div>
    {countries.map(country => (
      <p key={country.name.common}>
        {country.name.common}
        <button onClick={() => onClick(country.name.common)}>
          Show
        </button>
      </p>
    ))}
  </div>
)

const Countries = ({ rawData, onClick }) => {
  if(rawData.length >= 10){
    return(
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  }
  if(rawData.length === 1){
    const country = rawData[0]
    return(
      <div>
        <CountryDetails country={rawData[0]} />
       
      </div>
    )
  }

  return <CountryList countries={rawData} onClick={onClick} />
}

export default Countries