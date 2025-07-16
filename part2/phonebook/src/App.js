import { useState } from "react";
function App() {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const hasOnPersons = (objetoA, objetoB) => {
    return JSON.stringify(objetoA) === JSON.stringify(objetoB);
  }

  const handleForm = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <div>{persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}</div>
      <div>debug: {newName}</div>
    </div>
  );
}

export default App;
