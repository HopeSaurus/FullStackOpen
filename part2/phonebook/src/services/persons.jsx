import axios from 'axios'

const url = '/api/persons'

const getPersons = () =>{
  const request = axios.get(url)
  return request.then(response => response.data)
}

const createPerson = (newPerson) => {
  const request = axios.post(url, newPerson)
  return request.then(response => response.data)
}

const deletePerson = (personId) => {
  const request = axios.delete(`${url}/${personId}`)
  return request.then(response => response.data)
}

const updateNumber = (personId, updatedPerson) => {
  const request = axios.put(`${url}/${personId}`, updatedPerson)
  return request.then(request => request.data)
}

export default {getPersons, createPerson, deletePerson, updateNumber}