import { useState } from "react";
function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('');
  const handleForm = (event) => {
    event.preventDefault()
    const newPerson = persons.concat({
      name: newName
    })
    setPersons(newPerson)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleForm}>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{persons.map(person => <p key={person.name}>{person.name}</p>)}</div>
      <div>debug: {newName}</div>
    </div>
  );
}

export default App;
