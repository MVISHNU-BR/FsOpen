import React from 'react'

export default function Persons({ filteredPersons, deletePhone }) {
    return (
        <div>
            {filteredPersons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePhone(person.id)}>delete</button></p>)}
        </div>
    )
}
