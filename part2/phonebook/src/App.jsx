import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNotificacion, setNewNotification] = useState({message: null, className: ''})

  const initialRender = () => {
    personService.getPersons()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }
  useEffect(initialRender, [])

  const addRecord = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if(persons.some((entry) => entry.name == newName)){
      if(confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
        const targetPerson = persons.filter((entry) => entry.name == newName)[0]
        personService.updateNumber(targetPerson.id, newPerson)
        .then(returnedPerson => {
          setPersons(
            persons.map((person) => 
              (person.id == returnedPerson.id)? returnedPerson : person)
        )})
        .catch(() => {
          setNewNotification({message: `Couldnt update the record for ${newName}`, className:'error'})
          })
      }
    }else{
      personService.createPerson(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        return returnedPerson
    }).then((returnedPerson) => {
      setNewNotification({message: `Record created for ${returnedPerson.name}`, className:'success'})
    }
    ).then(() => {
      setTimeout(() => {
        setNewNotification({
          message: null,
          className: ''
        })
      }, 5000)
    }
    ).catch(() => {
        setNewNotification({message: `Couldnt create the record for ${newName}`, className:'error'})
        setTimeout(() => {
          setNewNotification({
            message: null,
            className: ''
          })
        }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteRecord = (personId, personName) => {
    const resp = confirm("Are you sure?")
    if(resp){
      personService.deletePerson(personId)
      .then((returnedPerson) => {
        setNewNotification({message: `Record deleted for ${returnedPerson.name}`, className:'success'})
        setPersons(persons.filter(person => person.id !== returnedPerson.id))
      })
      .catch((e) => {
        console.log(e)
        setNewNotification({message: `${personName} is already deleted on the database.`, className:'error'})
        }
        )
    }
    else return
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
      <Notification message={newNotificacion.message} className={newNotificacion.className}/>
      <Filter onChange={handleFilterChange} value={newFilter} />
      <Form onSubmit={addRecord} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} numberValue={newNumber} nameValue={newName} /> 
      <h2>Numbers</h2>
      <Persons persons={personsFiltered} deletePerson={deleteRecord}/>
    </div>
  )
}

export default App