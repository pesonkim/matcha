const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../utils/db')
const mysql = require('mysql')
const nodemailer = require('nodemailer')
const mailInfo = require('../utils/config').INFO_EMAIL
const port = require('../utils/config').PORT
const tokenSecret = require('../utils/config').TOKEN_SECRET
const moment = require('moment')

//async await routes

//get
//get id
//post
//patch id
//delete id

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
				user: 'hivewebhelper',
				pass: mailInfo
			}
		})

		const mailConfig = {
			from: 'hivewebhelper@gmail.com',
			to: email,
			subject: 'Verify your Matcha account',
			text: `Welcome to Matcha!

Before you can log in, we ask that you visit the following link to verify your account email:
http://localhost:${port}/verify?token=${token}`
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
			res.status(200).end()
		} else if (error && error.sqlMessage.includes('users.username')) {
			res.status(409).send({ error: 'Username already exists' })
		} else if (error && error.sqlMessage.includes('users.email')) {
			res.status(409).send({ error: 'Email already exists' })
		} else {
			res.status(500).send(error)
		}
	})
})

userRouter.get('/:id', async (req, res) => {
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
					gender: result[0].gender,
					orientation: result[0].orientation,
					bio: result[0].bio,
					tags: result[0].tags,
				})
		} else {
			return res.status(500).send({ error: 'Database error' })
		}
	})
})

userRouter.put('/:id', async (req, res) => {
	//console.log(req.token)
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
			//console.log(check)
			//console.log(result)
			if (result.length === 0) {
				return res.status(401).send({ error: 'Not authorized' })
			}
			if (error) {
				return res.status(500).send({ error: 'Database error' })
			}
			const newHash = await bcrypt.hash(password, 10)

			const sql = 'UPDATE users SET password=? WHERE id=?'
			const prepared = mysql.format(sql, [newHash, user.id])
			//console.log(prepared)
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

	//console.log(query)

	const prepared = mysql.format(query, parameters)
	//console.log(prepared)
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
							age: moment().diff(moment(result[0].birthdate, 'YYYY-MM-DD'), 'years'),
							gender: result[0].gender,
							orientation: result[0].orientation,
							bio: result[0].bio,
							tags: result[0].tags,
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
