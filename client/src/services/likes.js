import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/likes'

const getLikes = async () => {
	const response = await axios.get(baseUrl, auth.config())
	console.log(response)
	return response.data
}

const addLike = async (newLike) => {
	const response = await axios.post(baseUrl, newLike, auth.config())
	console.log(response)
	return response.data
}

const removeLike = async (id) => {
	const response = await axios.delete(`${baseUrl}/${id}`, auth.config())
	console.log(response)
	return response.data
}

export default { getLikes, addLike, removeLike }