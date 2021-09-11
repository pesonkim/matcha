const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const pool = require('../utils/db')
const mysql = require('mysql')
const nodemailer = require('nodemailer')
const mailInfo = require('../utils/config').INFO_EMAIL
const port = require('../utils/config').PORT

//async await routes

//get
//get id
//post
//patch id
//delete id

userRouter.post('/', async (req, res) => {
	const { firstname, lastname, username, email, password, token } = req.body

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

	const sql = 'INSERT INTO users (firstname, lastname, username, email, password, token) VALUES (?,?,?,?,?,?)'
	const values = [
		firstname,
		lastname,
		username,
		email,
		passwordHash,
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

module.exports = userRouter
