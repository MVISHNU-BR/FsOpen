export default function PersonForm({ handleForm, newName, handleNewName, newNumber, handleNewNumber }) {
    return (
        <form onSubmit={handleForm}>
            <div>
                name: <input value={newName} onChange={handleNewName} />
            </div>
            <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}