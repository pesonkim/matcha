const userRoute = require('express').Router()

//async await routes
userRoute.get('/', (req, res) => {
	res.json({ message: 'this is a test', data: [1, 2, 3] })
})

module.exports = userRoute