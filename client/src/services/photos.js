import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/photos'

const addPhoto = async (blob) => {
	//console.log(blob)
	const response = await axios.post(baseUrl, blob, auth.config())
	//console.log(response.data)
	return response.data
}

export default { addPhoto }