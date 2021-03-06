const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../utils/db')
const mysql = require('mysql')
const nodemailer = require('nodemailer')
const mailSender = require('../utils/config').EMAIL
const mailPassword = require('../utils/config').EMAIL_PW
const ip = require('../utils/config').IP
const port = require('../utils/config').PORT
const tokenSecret = require('../utils/config').JWT_SECRET
const moment = require('moment')

userRouter.post('/', async (req, res) => {
	const { firstname, lastname, username, birthdate, email, password, token } = req.body

	const date = moment(birthdate, 'YYYY-MM-DD')
	const age = moment().diff(moment(date, 'YYYY-MM-DD'), 'years')

	if (!date.isValid() || age < 16) {
		return res.status(403).send({ error: 'You must be at least 16 years old to register' })
	}

	const verifyMail = (email, token) => {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: mailSender,
				pass: mailPassword
			}
		})

		const mailConfig = {
			from: mailSender,
			to: email,
			subject: 'Verify your Matcha account',
			text: `Welcome to Matcha!

Before you can log in, we ask that you visit the following link to verify your account email:
${ip}:${port}/api/verify?token=${token}`
		}

		transporter.sendMail(mailConfig, (error, info) => {
			if (error) {
				console.log(error)
			} else {
				console.log('Message sent: %s', info.messageId)
			}
		})
	}

	const passwordHash = await bcrypt.hash(password, 10)

	const sql = 'INSERT INTO users (firstname, lastname, username, email, password, birthdate, token) VALUES (?,?,?,?,?,?,?)'
	const values = [
		firstname,
		lastname,
		username,
		email,
		passwordHash,
		birthdate,
		token
	]
	const prepared = mysql.format(sql, values)
	pool.query(prepared, (error, result) => {
		if (result) {
			console.log('Created user id', result.insertId)
			verifyMail(email, token)
			res.status(204).end()
		} else if (error && error.sqlMessage.includes('users.username')) {
			res.status(409).send({ error: 'Username already exists' })
		} else if (error && error.sqlMessage.includes('users.email')) {
			res.status(409).send({ error: 'Email already exists' })
		} else {
			res.status(500).send(error)
		}
	})
})

userRouter.get('/', async (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	let sql = 'SELECT orientation, gender from users WHERE id = ?'
	await pool.query(sql, [user.id], (error, result) => {
		if (error) {
			return res.status(500).send({ error: 'Database error' })
		}
		if (result) {
			sql = 'SELECT id, firstname, lastname, username, avatar, gender, orientation, tags, bio, latitude, longitude,\
				TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) AS age, fame, last_login, online from users WHERE ('
			let parameters = []

			if (result[0].orientation.split('').length) {
				if (result[0].orientation.split('').includes('f')) {
					parameters.push('female')
				}
				if (result[0].orientation.split('').includes('m')) {
					parameters.push('male')
				}
				if (result[0].orientation.split('').includes('o')) {
					parameters.push('other')
				}
			}

			for (let i = 0; i < parameters.length; i++) {
				sql = sql.concat(`gender = '${parameters[i]}'`)
				if (i < parameters.length - 1) {
					sql = sql.concat(' OR ')
				}
			}
			sql = sql.concat(`) AND id != ? AND orientation LIKE '%${result[0].gender.slice(0,1)}%'`)
			const prepared = mysql.format(sql, [user.id])
			pool.query(prepared, (error, result) => {
				if (result) {
					return res.status(200).send(result)
				} else {
					return res.status(500).send({ error: 'Database error' })
				}
			})
		}
	})
})

userRouter.get('/:id', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user || user.id !== Number(req.params.id)) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	pool.query('SELECT * from users WHERE id = ?', user.id, (error, result) => {
		if (result) {
			res
				.status(200)
				.send({
					email: result[0].email,
					username: result[0].username,
					firstname: result[0].firstname,
					lastname: result[0].lastname,
					latitude: result[0].latitude,
					longitude: result[0].longitude,
					gender: result[0].gender,
					orientation: result[0].orientation,
					bio: result[0].bio,
					tags: result[0].tags,
					avatar: result[0].avatar,
					fame: result[0].fame,
					online: result[0].online,
					last_login: result[0].last_login,
				})
		} else {
			return res.status(500).send({ error: 'Database error' })
		}
	})
})

userRouter.put('/:id', async (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user || user.id !== Number(req.params.id)) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const { password, ...body } = req.body

	if (!body.gender || body.gender === '') {
		return res.status(403).send({ error: 'Gender is required' })
	} else if (!body.orientation || body.orientation === '') {
		return res.status(403).send({ error: 'Sexual orientation is required' })
	}

	if (password) {
		const sql = 'SELECT password FROM users WHERE id = ?'
		const check = mysql.format(sql, [user.id])
		pool.query(check, async (error, result) => {
			if (result.length === 0) {
				return res.status(401).send({ error: 'Not authorized' })
			}
			if (error) {
				return res.status(500).send({ error: 'Database error' })
			}
			const newHash = await bcrypt.hash(password, 10)

			const sql = 'UPDATE users SET password=? WHERE id=?'
			const prepared = mysql.format(sql, [newHash, user.id])
			pool.query(prepared, (error, result) => {
				if (result) {
					console.log('Updated password, affected rows:', result.affectedRows)
				}
				if (error) {
					return res.status(500).send(error)
				}
			})
		})
	}

	let query = 'UPDATE users SET '
	let parameters = []

	Object.keys(body).forEach((key) => {
		query = query.concat(`${key} = ?, `)
	})
	Object.values(body).forEach((value) => {
		parameters.push(value)
	})

	query = query.slice(0, -2)
	query = query.concat(` WHERE id = ${user.id}`)

	const prepared = mysql.format(query, parameters)
	pool.query(prepared, (error, result) => {
		if (result && result.affectedRows) {
			pool.query('SELECT * from users WHERE id = ?', user.id, (error, result) => {
				if (error) {
					return res.status(500).send(error)
				}
				else if (result) {
					console.log(`User id ${result[0].id} profile updated`)
					//update token to match new profile
					const userForToken = {
						id: result[0].id,
					}

					//expire token in 60 minutes
					const token = jwt.sign(
						userForToken,
						tokenSecret,
						{ expiresIn: 60 * 60 }
					)

					return res
						.status(200)
						.send({
							token,
							id: result[0].id,
							email: result[0].email,
							username: result[0].username,
							firstname: result[0].firstname,
							lastname: result[0].lastname,
							latitude: result[0].latitude,
							longitude: result[0].longitude,
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
		}
		else if (error && error.sqlMessage.includes('users.username')) {
			return res.status(409).send({ error: 'Username already exists' })
		} else if (error && error.sqlMessage.includes('users.email')) {
			return res.status(409).send({ error: 'Email already exists' })
		} else {
			return res.status(500).send(error)
		}
	})
})

module.exports = userRouter
