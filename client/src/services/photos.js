import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/api/photos'

const addPhoto = async (blob) => {
	const response = await axios.post(baseUrl, blob, auth.config())
	return response.data
}

export default { addPhoto }