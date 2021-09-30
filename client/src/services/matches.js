import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/matches'

const getMatches = async () => {
	const response = await axios.get(baseUrl, auth.config())
	// console.log(response)
	return response.data
}

export default { getMatches }