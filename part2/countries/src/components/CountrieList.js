import React from 'react'

const CountrieList = ({ filteredCountries }) => {
    const filteringCountries = filteredCountries;
    if (filteringCountries.length > 10) {
        return <div>
            Too many matches, specify another filter
        </div>
    }
    if (filteredCountries.length === 1) {
        const countrie = filteredCountries[0]
        const languages = Object.keys(countrie.languages)
        return <div>
            <h1>{countrie.name.common}</h1>
            <p>Capital: {countrie.capital}</p>
            <p>Area: {countrie.area}</p>

            <h2>Languages</h2>
            <div>
                <ul>
                    {languages.map(language => <li key={language}>{countrie.languages[language]}</li>)}
                </ul>
            </div>
            <div >
                <img style={{ border: '1px solid red' }} src={countrie.flags.png} alt="Country flag" width="200" height="200" />
            </div>
        </div>
    }
    return (
        <div>
            <ul>{filteredCountries.map(contries => <li key={contries.name.common}>{contries.name.common}</li>)}</ul>
        </div>
    )
}

export default CountrieList
