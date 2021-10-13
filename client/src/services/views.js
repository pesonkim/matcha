import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = '/api/views'

const getViews = async () => {
	const response = await axios.get(baseUrl, auth.config())
	return response.data
}

const addView = async (newView) => {
	const response = await axios.post(baseUrl, newView, auth.config())
	return response.data
}

export default { getViews, addView }