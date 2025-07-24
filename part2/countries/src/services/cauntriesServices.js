import axios from "axios"
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api"
const api_key = process.env.REACT_APP_API_KEY

const getCountries = () => {
    const request = axios.get(`${baseUrl}/all`,)

    return request.then((response) => {
        return response.data;
    })
}

const weatherCountry = (local) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${local}&lang=pt_br&units=metric&appid=${api_key}`)
    return request.then((response) => {
        return response.data
    })
}


const countrieServices = {
    getCountries, weatherCountry
}


export default countrieServices;