import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = '/api/users'

const getUsers = async () => {
	const response = await axios.get(baseUrl, auth.config())
	return response.data
}

const createUser = async (userObject) => {
	const response = await axios.post(baseUrl, userObject)
	return response.data
}

const getProfile = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`, auth.config())
	return response.data
}

const updateProfile = async (userObject, id) => {
	const response = await axios.put(`${baseUrl}/${id}`, userObject, auth.config())
	window.localStorage.setItem('user', JSON.stringify(response.data))
	return response.data
}

export default { getUsers, createUser, getProfile, updateProfile }