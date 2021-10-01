import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/messages'

const getMessages = async () => {
	const response = await axios.get(baseUrl, auth.config())
	// console.log(response)
	return response.data
}

const addMessage = async (newMessage) => {
	const response = await axios.post(baseUrl, newMessage, auth.config())
	// console.log(response)
	return response.data
}

const updateMessage = async (id, message) => {
	const response = await axios.put(`${baseUrl}/${id}`, message, auth.config())
	// console.log(response)
	return response.data
}

export default { getMessages, addMessage, updateMessage }