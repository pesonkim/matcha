import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/api/matches'
const likesUrl = 'http://localhost:3001/api/matches/likes'

const getMatches = async () => {
	const response = await axios.get(baseUrl, auth.config())
	return response.data
}

const getPublicLikes = async () => {
	const response = await axios.get(likesUrl, auth.config())
	return response.data
}

export default { getMatches, getPublicLikes }