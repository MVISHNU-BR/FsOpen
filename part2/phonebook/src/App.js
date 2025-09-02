import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneServices from "./server/phoneServices"
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [message, setMessage] = useState(null)
  const hasOnPersons = (objetoA, objetoB) => {
    return JSON.stringify(objetoA) === JSON.stringify(objetoB);
  }

  const fethPersons = () => {
    phoneServices.getPhones().then((initialPhones => {
      setPersons(initialPhones)
    }))
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(fethPersons, [])

  const handleForm = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    //const conditionPersons = persons.some(person => person.name.toLowerCase(), newPerson.name.toLowerCase())
    const conditionPersons = persons.some(person => hasOnPersons(person.name, newPerson.name))

    if (conditionPersons) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const findPerson = persons.find(person => person.name === newName)
        const changedPhone = { ...findPerson, number: newNumber }

        phoneServices.editPhone(changedPhone.id, changedPhone).then((updatedPerson) => {
          setPersons(persons.map(person => person.id !== changedPhone.id ? person : updatedPerson))
          setNewName('')
          setNewNumber('')
        })
          .catch(error => {
            setMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
              setPersons(persons.filter(person => person.id !== changedPhone.id));
              setNewName('')
              setNewNumber('')
            }, 5000);
            console.log(error)
          })
      }
      return
    }

    phoneServices.createPhone(newPerson).then(person => {
      console.log('por que estou aqui')
      const addedPerson = persons.concat(person)
      setPersons(addedPerson)
      setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
      setNewName('')
      setNewNumber('')
    }).catch(error => {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    })
  }

  useEffect(() => {
    if (search === '') {
      setFilteredPersons(persons);
    } else {
      const result = persons.filter(person =>
        person.name.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilteredPersons(result);
    }
  }, [search, persons]);

  const deletePhone = (id) => {
    if (window.confirm('Delete phone?')) {
      phoneServices.postDelete(id).then(() => {
        const deletePhone = persons.filter(phone => phone.id !== id)
        setPersons(deletePhone);
      })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter value={search} handleSearch={(event) => setSearch(event.target.value)} />
      <h2>Add a new</h2>
      <PersonForm handleForm={handleForm} newName={newName} newNumber={newNumber} handleNewName={(event) => setNewName(event.target.value)} handleNewNumber={(event) => setNewNumber(event.target.value)} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePhone={deletePhone} />
    </div>
  );
}

export default App;
