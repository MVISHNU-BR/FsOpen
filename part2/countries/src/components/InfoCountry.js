const InfoCountry = ({ countrie, languages, weather }) => {
    if (!weather) {
        return null
    }
    return (
        <div>
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
            <div>
                <h2>Weather in {countrie.capital}</h2>
                <p>
                    temperature {weather.main.temp} Celsius
                </p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon" />
                <p>
                    Wind: {weather.wind.speed} m/s
                </p>
            </div>
        </div>
    )
}

export default InfoCountry
