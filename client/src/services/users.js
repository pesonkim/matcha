import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

//get
//get id
//post
//patch id
//delete id

const createUser = async (userObject) => {
	const response = await axios.post(baseUrl, userObject)
	console.log(response)
	return response.data
}

export default { createUser }