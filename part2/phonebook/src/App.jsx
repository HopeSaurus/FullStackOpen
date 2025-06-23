import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
let counter = 5;

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const addRecord = (event) => {
    event.preventDefault()
    if(persons.some((entry) => entry.name == newName)){
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      return
    }
    let newPersons = [...persons].concat({name: newName, number: newNumber, id: counter++})
    setPersons(newPersons)
  } 

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  const personsFiltered = persons.filter((item) => (item.name.toLowerCase().includes(newFilter.toLowerCase())))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={newFilter} />
      <Form onSubmit={addRecord} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} numberValue={newNumber} nameValue={newName} /> 
      <h2>Numbers</h2>
      <Persons persons={personsFiltered} />
    </div>
  )
}

export default App