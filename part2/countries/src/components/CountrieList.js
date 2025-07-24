import InfoCountry from './InfoCountry';
import countrieServices from '../services/cauntriesServices';
import { useEffect, useState } from 'react';
const CountrieList = ({ filteredCountries, selectedCountry, setSelectedCountry }) => {
    const filteringCountries = filteredCountries;
    const [weather, setweather] = useState(null)

    //Todo: Change this thing for a better way to make the same thing
    useEffect(() => {
        if (selectedCountry && selectedCountry.capital) {
            countrieServices.weatherCountry(selectedCountry.capital).then((response) => {
                setweather(response);
            })
        } else if (filteredCountries.length === 1) {
            countrieServices.weatherCountry(filteredCountries[0].capital).then((response) => {
                setweather(response);
            })
        }
    }, [selectedCountry, filteredCountries]);

    const handleShowCountry = (countrie) => {
        setSelectedCountry(countrie);
    }


    if (filteringCountries.length > 10) {
        return <div>
            Too many matches, specify another filter
        </div>
    }

    if (filteredCountries.length === 1) {
        const countrie = filteredCountries[0]
        const languages = Object.keys(countrie.languages)
        return <InfoCountry weather={weather} countrie={countrie} languages={languages} />
    }

    if (selectedCountry) {
        const languages = Object.keys(selectedCountry.languages);

        return <InfoCountry weather={weather} countrie={selectedCountry} languages={languages} />
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
