import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import countryService from './Services/countries'
import Countries from './Components/Countries'
import './App.css'


function App() {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState (null)
  const [countriesFiltered, setCountriesFiltered] = useState([])

  useEffect(() => {
    countryService.getCountries()
    .then((initialCountries)=>{
      setCountries(initialCountries)
    })
  },[])

  if(countries===null){
    return null
  }

  const filterOnChange = (event) => {
    const filter = event.target.value
    setNewFilter(filter)
    setCountriesFiltered(filterCountries(filter))
  }
    
  const filterCountries = (filter) => {
    return countries.filter((country) => (country.name.common.toLowerCase().includes(filter.toLowerCase())))
  }
  
  const onClickShowCountry = (countryId) => {
    setCountriesFiltered(filterCountries(countryId))
  }

  return (
    <>
      <Filter onChange={filterOnChange} value={newFilter}/>
      <Countries rawData={countriesFiltered} onClick={onClickShowCountry}/>
    </>
  )
}

export default App
