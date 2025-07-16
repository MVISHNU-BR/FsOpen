import { useState } from "react";
import { useEffect } from "react";
function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const hasOnPersons = (objetoA, objetoB) => {
    return JSON.stringify(objetoA) === JSON.stringify(objetoB);
  }

  const handleForm = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const addPerson = persons.concat(newPerson)

    const conditionPersons = persons.some(person => hasOnPersons(person, newPerson))
    if (conditionPersons) {
      return alert(`${newName} is already added to phonebook`)
    }
    setPersons(addPerson)
    setNewName('')
    setNewNumber('')
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
      <div>filter shown with <input value={search} onChange={(event) => setSearch(event.target.value)} /></div>
      <h2>Add a new</h2>
      <form onSubmit={handleForm}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{filteredPersons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}</div>
      <div>debug: {newName}</div>
    </div>
  );
}

export default App;
