const exampleRoute = require('express').Router()

//async await routes
exampleRoute.get('/', (req, res) => {
	res.json({ message: 'this is a test', data: [1, 2, 3] })
})

module.exports = exampleRoute