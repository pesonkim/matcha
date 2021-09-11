import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/login'

const login = async (userData) => {
	const response = await axios.post(baseUrl, userData)
	localStorage.setItem('user', JSON.stringify({
		token: response.data.token,
		id: response.data.id
	}))
	auth.setToken(response.data.token)
	return response.data
}

const logout = () => {
	window.localStorage.clear()
	window.location.href='/'
}

export default { login, logout }