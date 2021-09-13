import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/api/users'

//get
//get id
//post
//patch id
//delete id

const createUser = async (userObject) => {
	const response = await axios.post(baseUrl, userObject)
	console.log(response)
	return response.data
}

const updateProfile = async (userObject, id) => {
	const response = await axios.put(`${baseUrl}/${id}`, userObject, auth.config())
	console.log(response)
	return response.data
}

export default { createUser, updateProfile }