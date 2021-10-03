import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/tags'

const getTags = async () => {
	const response = await axios.get(baseUrl, auth.config())
	return response.data
}

const addTags = async (update) => {
	const response = await axios.post(baseUrl, update, auth.config())
	return response.data
}

export default { getTags, addTags }