import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/api/views'

const getViews = async () => {
	const response = await axios.get(baseUrl, auth.config())
	// console.log(response)
	return response.data
}

const addView = async (newView) => {
	const response = await axios.post(baseUrl, newView, auth.config())
	// console.log(response)
	return response.data
}

export default { getViews, addView }