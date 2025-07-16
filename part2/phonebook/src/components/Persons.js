import React from 'react'

export default function Persons({ filteredPersons }) {
    return (
        <div>
            {filteredPersons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
        </div>
    )
}
