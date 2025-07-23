import React from 'react'

const Search = ({ search, handleSearch }) => {
    return (
        <div>
            find coutries <input type='text' value={search} onChange={handleSearch} />
        </div>
    )
}

export default Search
