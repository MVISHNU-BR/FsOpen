import React from 'react'

export default function Filter({ search, handleSearch }) {
    return (
        <div>filter shown with <input value={search} onChange={handleSearch} /></div>
    )
}
