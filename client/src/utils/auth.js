let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const config = () => ({
	headers: { Authorization: token },
})

export default { setToken, config }