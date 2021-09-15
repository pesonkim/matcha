import axios from 'axios'

const baseUrl = 'http://localhost:3001/photos'

const addPhoto = async (formData, token) => {
	console.log(formData)
	const response = await axios.post(baseUrl, formData, {
		headers: {
			Authorization: `bearer ${token}`,
			'Content-Type': 'multipart/form-data',
		}
	})
	console.log(response.data)
	return response.data
}

export default { addPhoto }