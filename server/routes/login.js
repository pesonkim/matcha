const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../utils/db')
const mysql = require('mysql')
const tokenSecret = require('../utils/config').TOKEN_SECRET
const moment = require('moment')
const axios = require('axios')

loginRouter.post('/', async (req, res) => {
	const { username, password, ip } = req.body

	const coords = await axios.get(`https://geolocation-db.com/json/${ip}`)

	const latitude = coords.data.latitude
	const longitude = coords.data.longitude

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
				//console.log(result[0])
				pool.query(`UPDATE users SET last_login = CURRENT_TIMESTAMP, latitude = ${latitude}, \
				longitude = ${longitude} WHERE id = ${result[0].id}`)

				const userForToken = {
					id: result[0].id,
				}

				//expire token in 60 minutes
				const token = jwt.sign(
					userForToken,
					tokenSecret,
					{ expiresIn: 60 * 60 }
				)

				//console.log(result[0])
				console.log(`User id ${result[0].id} logged in`)
				res
					.status(200)
					.send({
						token,
						id: result[0].id,
						email: result[0].email,
						username: result[0].username,
						firstname: result[0].firstname,
						lastname: result[0].lastname,
						latitude: latitude,
						longitude: longitude,
						age: moment().diff(moment(result[0].birthdate, 'YYYY-MM-DD'), 'years'),
						gender: result[0].gender,
						orientation: result[0].orientation,
						bio: result[0].bio,
						tags: result[0].tags,
						avatar: result[0].avatar,
					})
			} else {
				return res.status(500).send({ error: 'Database error' })
			}
		})

	})
})

module.exports = loginRouter
