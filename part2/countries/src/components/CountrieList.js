import React from 'react'
import InfoCountry from './InfoCountry';

const CountrieList = ({ filteredCountries, selectedCountry, setSelectedCountry }) => {
    const filteringCountries = filteredCountries;

    if (filteringCountries.length > 10) {
        return <div>
            Too many matches, specify another filter
        </div>
    }
    if (filteredCountries.length === 1) {
        const countrie = filteredCountries[0]
        const languages = Object.keys(countrie.languages)
        return <InfoCountry countrie={countrie} languages={languages} />
    }

    const handleShowCountry = (countrie) => {
        setSelectedCountry(countrie);
    }

    if (selectedCountry) {
        const languages = Object.keys(selectedCountry.languages);
        return <InfoCountry countrie={selectedCountry} languages={languages} />
    }

    return (
        <div>
            {filteredCountries.map(contrie => <div key={contrie.name.common}>
                {contrie.name.common} <button onClick={() => handleShowCountry(contrie)} >Show</button>
            </div>
            )}
        </div>
    )
}

export default CountrieList
