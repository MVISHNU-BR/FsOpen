import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneServices from "./server/phoneServices"

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons)
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

    const conditionPersons = persons.some(person => hasOnPersons(person, newPerson))
    if (conditionPersons) {
      return alert(`${newName} is already added to phonebook`)
    }

    phoneServices.createPhone(newPerson).then((person) => {
      const addPerson = persons.concat(person)
      setPersons(addPerson)
      setNewName('')
      setNewNumber('')
    })
      .catch(error => {
        console.log(error)
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
      <Filter value={search} handleSearch={(event) => setSearch(event.target.value)} />
      <h2>Add a new</h2>
      <PersonForm handleForm={handleForm} newName={newName} newNumber={newNumber} handleNewName={(event) => setNewName(event.target.value)} handleNewNumber={(event) => setNewNumber(event.target.value)} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePhone={deletePhone} />
    </div>
  );
}

export default App;
