const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../utils/db')
const mysql = require('mysql')
const tokenSecret = require('../utils/config').TOKEN_SECRET

loginRouter.post('/', async (req, res) => {
	const { username, password } = req.body

	const sql = 'SELECT password, verified FROM users WHERE username = ?'
	const prepared = mysql.format(sql, username)
	pool.query(prepared, async (error, result) => {
		if (result.length === 0) {
			return res.status(401).send({ error: 'Invalid username or password' })
		}
		if (error) {
			return res.status(500).send({ error: 'Database error' })
		}
		const hash = result[0].password
		const passwordCompare = await bcrypt.compare(password, hash)

		if (!passwordCompare) {
			return res.status(401).send({ error: 'Invalid username or password' })
		}
		if (result[0].verified === 0) {
			return res.status(401).send({ error: 'Account is not verified. Please check your email' })
		}

		//allow login
		pool.query('SELECT * from users WHERE username = ?', username, (error, result) => {
			if (result) {
				console.log(result[0])
				pool.query(`UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ${result[0].id}`)

				const userForToken = {
					username: result[0].username,
					id: result[0].id,
				}

				//expire token in 60 minutes
				const token = jwt.sign(
					userForToken,
					tokenSecret,
					{ expiresIn: 60 * 60 }
				)

				res
					.status(200)
					.send({
						token,
						id: result[0].id,
						username: result[0].username,
						firstname: result[0].firstname,
						lastname: result[0].lastname,
						age: result[0].age,
					})
			} else {
				return res.status(500).send({ error: 'Database error' })
			}
		})

	})
})

module.exports = loginRouter
