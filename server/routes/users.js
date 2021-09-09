const userRouter = require('express').Router()

//async await routes

//get
//get id
//post
//patch id
//delete id

userRouter.post('/', (req, res) => {
	const body = req.body
	res.json(body)
})

module.exports = userRouter