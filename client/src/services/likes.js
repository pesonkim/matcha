import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = '/api/likes'

const getLikes = async () => {
	const response = await axios.get(baseUrl, auth.config())
	return response.data
}

const addLike = async (newLike) => {
	const response = await axios.post(baseUrl, newLike, auth.config())
	return response.data
}

const updateRead = async (like) => {
	const response = await axios.put(`${baseUrl}/${like.from}`, like, auth.config())
	return response.data
}

const removeLike = async (like) => {
	const headers = auth.config()
	const response = await axios.delete(`${baseUrl}/${like.id}`, { headers: headers.headers, data: like })
	return response.data
}

export default { getLikes, addLike, updateRead, removeLike }