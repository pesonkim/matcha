import axios from 'axios'

const baseUrl = 'http://localhost:3001/tags'

const getTags = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const addTags = async (update) => {
	const response = await axios.post(baseUrl, update)
	return response.data
}

export default { getTags, addTags }