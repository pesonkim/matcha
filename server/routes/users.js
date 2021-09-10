const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const pool = require('../utils/db')
const mysql = require('mysql')

//async await routes

//get
//get id
//post
//patch id
//delete id

userRouter.post('/', async (req, res) => {
	const { firstname, lastname, username, email, password, token } = req.body

	const passwordHash = await bcrypt.hash(password, 10)

	const sql = 'INSERT INTO users (firstname, lastname, username, email, password, token) VALUES (?,?,?,?,?,?)'
	const values = [
		firstname,
		lastname,
		username,
		email,
		passwordHash,
		token
	]
	console.log(values)
	const prepared = mysql.format(sql, values)
	pool.query(prepared, (error, result) => {
		if (result) {
			res.status(200).json(result)
		} else if (error && error.sqlMessage.includes('users.username')) {
			res.status(409).json({ error: 'Username already exists' })
		} else if (error && error.sqlMessage.includes('users.email')) {
			res.status(409).json({ error: 'Email already exists' })
		} else {
			res.status(500).send(error)
		}
	})
})

module.exports = userRouter
