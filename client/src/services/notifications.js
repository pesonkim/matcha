import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/notif'

const getNotif = async () => {
	const response = await axios.get(baseUrl, auth.config())
	console.log(response)
	return response.data
}

const addNotif = async (newNotif) => {
	const response = await axios.post(baseUrl, newNotif, auth.config())
	console.log(response)
	return response.data
}

const updateNotif = async (id, notif) => {
	const response = await axios.put(`${baseUrl}/${id}`, notif, auth.config())
	console.log(response)
	return response.data
}

export default { getNotif, addNotif, updateNotif }