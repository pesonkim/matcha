const getToken = () => {
	const rand = () => Math.random().toString(36).substr(2)
	const randToken = () => rand() + rand() + rand()
	const token = randToken()

	return token
}

module.exports = getToken