import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = 'http://localhost:3001/blocks'

const getBlocks = async () => {
	const response = await axios.get(baseUrl, auth.config())
	// console.log(response)
	return response.data
}

const addBlock = async (newBlock) => {
	const response = await axios.post(baseUrl, newBlock, auth.config())
	// console.log(response)
	return response.data
}

const removeBlock = async (id) => {
	const response = await axios.delete(`${baseUrl}/${id}`, auth.config())
	// console.log(response)
	return response.data
}

export default { getBlocks, addBlock, removeBlock }