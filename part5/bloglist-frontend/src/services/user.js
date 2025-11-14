import axios from 'axios'
const baseUrl = '/api/login'

const loginUser = async (userData) => {
    const response = await axios.post(baseUrl, userData)
    return response.data
}

export default { loginUser }