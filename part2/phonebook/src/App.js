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
  }

  useEffect(fethPersons, [])

  const handleForm = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }
    const addPerson = persons.concat(newPerson)

    const conditionPersons = persons.some(person => hasOnPersons(person, newPerson))
    if (conditionPersons) {
      return alert(`${newName} is already added to phonebook`)
    }
    phoneServices.createPhone(newPerson).then((response) => {
      setPersons(addPerson)
      setNewName('')
      setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} handleSearch={(event) => setSearch(event.target.value)} />
      <h2>Add a new</h2>
      <PersonForm handleForm={handleForm} newName={newName} newNumber={newNumber} handleNewName={(event) => setNewName(event.target.value)} handleNewNumber={(event) => setNewNumber(event.target.value)} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
}

export default App;
