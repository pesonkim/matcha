import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/reports'

const addReport = async (newReport) => {
	const response = await axios.post(baseUrl, newReport, auth.config())
	console.log(response)
	return response.data
}

export default { addReport }