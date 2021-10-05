import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/api/messages'

const getMessages = async () => {
	const response = await axios.get(baseUrl, auth.config())
	return response.data
}

const addMessage = async (newMessage) => {
	const response = await axios.post(baseUrl, newMessage, auth.config())
	return response.data
}

const updateMessages = async (message) => {
	const response = await axios.put(`${baseUrl}/${message.receiver}`, message, auth.config())
	return response.data
}

export default { getMessages, addMessage, updateMessages }