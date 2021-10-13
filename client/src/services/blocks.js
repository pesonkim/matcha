import axios from 'axios'
import auth from '../utils/auth'

const baseUrl = '/api/blocks'

const getBlocks = async () => {
	const response = await axios.get(baseUrl, auth.config())
	return response.data
}

const addBlock = async (newBlock) => {
	const response = await axios.post(baseUrl, newBlock, auth.config())
	return response.data
}

const removeBlock = async (block) => {
	const headers = auth.config()
	const response = await axios.delete(`${baseUrl}/${block.id}`, { headers: headers.headers, data: block })
	return response.data
}

export default { getBlocks, addBlock, removeBlock }