import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = '/api/notif'

const getNotif = async () => {
	const response = await axios.get(baseUrl, auth.config())
	return response.data
}

const addNotif = async (newNotif) => {
	const response = await axios.post(baseUrl, newNotif, auth.config())
	return response.data
}

const updateNotif = async (notif, id) => {
	const response = await axios.put(`${baseUrl}/${id}`, notif, auth.config())
	return response.data
}

export default { getNotif, addNotif, updateNotif }