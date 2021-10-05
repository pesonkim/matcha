const reportsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET
const pool = require('../utils/db')
const mysql = require('mysql')

reportsRouter.get('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const sql = 'SELECT * FROM reports WHERE sender=?'
	const values = [
		user.id
	]
	const prepared = mysql.format(sql, values)
	// console.log(prepared)
	pool.query(prepared, (error, result) => {
		if (result) {
			return res.status(200).send(result)
		} else if (error) {
			return res.status(500).send(error)
		} else {
			return res.status(500).send({ error: 'Database error' })
		}
	})
})

reportsRouter.post('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const sql = 'INSERT INTO reports (sender, receiver, created_at) VALUES (?,?,CURRENT_TIMESTAMP)'
	const values = [
		req.body.from,
		req.body.to,
	]
	const prepared = mysql.format(sql, values)
	// console.log(prepared)
	pool.query(prepared, (error, result) => {
		if (result) {
			pool.query(`UPDATE users SET fame = fame - 5 WHERE id = ${req.body.to}`)
			console.log('New profile report:', result.insertId)
			res.status(204).end()
		} else if (error) {
			res.status(500).send(error)
		} else {
			res.status(500).send({ error: 'Database error' })
		}
	})
})

module.exports = reportsRouter