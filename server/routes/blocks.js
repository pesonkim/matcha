const blocksRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET
const pool = require('../utils/db')
const mysql = require('mysql')

blocksRouter.get('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}
})

blocksRouter.post('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const sql = 'INSERT INTO blocks (sender, receiver) VALUES (?,?)'
	const values = [
		req.body.from,
		req.body.to,
	]
	const prepared = mysql.format(sql, values)
	// console.log(prepared)
	pool.query(prepared, (error, result) => {
		if (result) {
			pool.query(`UPDATE users SET fame = fame - 5 WHERE id = ${req.body.to}`)
			console.log('New profile block:', result.insertId)
			res.status(200).end()
		} else if (error) {
			res.status(500).send(error)
		} else {
			res.status(500).send({ error: 'Database error' })
		}
	})
})

blocksRouter.delete('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}
})

module.exports = blocksRouter