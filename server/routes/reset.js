const resetRouter = require('express').Router()
const bcrypt = require('bcrypt')
const pool = require('../utils/db')
const mysql = require('mysql')
const nodemailer = require('nodemailer')
const mailInfo = require('../utils/config').INFO_EMAIL
const port = require('../utils/config').PORT
const getToken = require('../utils/token')

resetRouter.post('/', (req, res) => {
	const { email } = req.body

	const resetEmail = (email, token) => {
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
			subject: 'Matcha account password reset',
			text: `Your Matcha account recently requested a password change.

Please visit the following link to register a new password for your account:
http://localhost:${port}/reset/${token}`
		}

		transporter.sendMail(mailConfig, (error, info) => {
			if (error) {
				console.log(error)
			} else {
				console.log('Message sent: %s', info.messageId)
			}
		})
	}

	const sql = 'SELECT email, verified, token FROM users WHERE email=?'
	const prepared = mysql.format(sql, email)
	pool.query(prepared, async (error, result) => {
		if (error) {
			return res.status(500).send({ error: 'Database error' })
		}
		if (result.length === 0) {
			return res.status(401).send({ error: 'No account registered with this email' })
		}
		if (result[0].verified === 1) {
			resetEmail(email, result[0].token)
			return res.status(200).send({ message: 'Link to reset form sent, please check you email' })
		}
		else {
			return res.status(401).send({ error: 'Account verification needed, please check your email' })
		}
	})
})

resetRouter.post('/new', (req, res) => {
	const { password, token } = req.body

	const sql = 'SELECT password, token FROM users WHERE token = ?'
	const prepared = mysql.format(sql, token)
	pool.query(prepared, async (error, result) => {
		if (result.length === 0) {
			return res.status(401).send({ error: 'Not authorized' })
		}
		if (error) {
			return res.status(500).send({ error: 'Database error' })
		}
		const hash = result[0].password
		const passwordCompare = await bcrypt.compare(password, hash)

		if (passwordCompare) {
			return res.status(401).send({ error: 'New password cannot be the same as old' })
		}

		//allow password change, update token
		const newHash = await bcrypt.hash(password, 10)
		const newToken = getToken()

		const sql = 'UPDATE users SET password=?, token=? WHERE token=?'
		const prepared = mysql.format(sql, [newHash, newToken, token])
		pool.query(prepared, (error, result) => {
			if (result) {
				console.log('Updated password, affected rows:', result.affectedRows)
				res.status(200).send({ message: 'Account password has been updated' })
			}
			else {
				return res.status(500).send({ error: 'Database error' })
			}
		})
	})
})

module.exports = resetRouter