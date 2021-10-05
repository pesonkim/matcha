import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/api/reports'

const getReports = async () => {
	const response = await axios.get(baseUrl, auth.config())
	// console.log(response)
	return response.data
}

const addReport = async (newReport) => {
	const response = await axios.post(baseUrl, newReport, auth.config())
	// console.log(response)
	return response.data
}

export default { getReports, addReport }