import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = '/api/matches'
const likesUrl = '/api/matches/likes'

const getMatches = async () => {
	const response = await axios.get(baseUrl, auth.config())
	return response.data
}

const getPublicLikes = async () => {
	const response = await axios.get(likesUrl, auth.config())
	return response.data
}

export default { getMatches, getPublicLikes }