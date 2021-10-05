import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/reset'
const resetUrl = 'http://localhost:3001/api/reset/new'

const forgot = async (email) => {
	const response = await axios.post(baseUrl, email)
	return response.data
}

const reset = async (password) => {
	const response = await axios.post(resetUrl, password)
	return response.data
}

export default { forgot, reset }