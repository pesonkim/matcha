import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = '/api/login'

const login = async (userData) => {
	const response = await axios.post(baseUrl, userData)
	window.localStorage.setItem('user', JSON.stringify(response.data))
	auth.setToken(response.data.token)
	return response.data
}

const logout = () => {
	window.localStorage.clear()
	window.location.href='/'
}

export default { login, logout }