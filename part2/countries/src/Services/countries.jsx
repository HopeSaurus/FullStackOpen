import axios from "axios";

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getCountries = () => {
  const request = axios.get(baseUrl)
  return request.then(request => request.data)
}

const getCountryWeather = (lat, lon) => {
  const api_key = import.meta.env.VITE_WEATHER_KEY
  if(!api_key) return {}
  const request = axios.get(`${weatherUrl}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
  return request.then(request => request.data)
}

export default {getCountries, getCountryWeather}