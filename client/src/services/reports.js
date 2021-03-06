import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = '/api/reports'

const getReports = async () => {
	const response = await axios.get(baseUrl, auth.config())
	return response.data
}

const addReport = async (newReport) => {
	const response = await axios.post(baseUrl, newReport, auth.config())
	return response.data
}

export default { getReports, addReport }