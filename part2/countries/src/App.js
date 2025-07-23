import { useState, useEffect } from "react";
import countrieServices from "./services/cauntriesServices";
import CountrieList from "./components/CountrieList";
import Search from "./components/search";
function App() {
  const [allCountries, setAllCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilterCountrie] = useState([])

  useEffect(() => {
    countrieServices.getCountries().then(initialCountries => {
      setAllCountries(initialCountries)
    })
  }, [])

  useEffect(() => {
    console.log(search)
    if (search !== '') {
      const result = allCountries.filter(countrie =>
        countrie.name.common.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilterCountrie(result);
    } else {
      setFilterCountrie([])
    }
  }, [search, allCountries])


  return (
    <div className="App">
      <Search value={search} handleSearch={(event) => setSearch(event.target.value)} />
      <CountrieList filteredCountries={filteredCountries} />
    </div>
  );
}

export default App;
