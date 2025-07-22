import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

const getPhones = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => {
        return response.data;
    })
}

const createPhone = (phone) => {
    const request = axios.post(baseUrl, phone)
    return request.then((response) => {
        return response.data;
    })
}

const phoneServices = { getPhones, createPhone };
export default phoneServices;