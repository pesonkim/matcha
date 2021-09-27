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

	const sql = 'SELECT id, sender, receiver, firstname FROM blocks t1 INNER JOIN (SELECT firstname, id as userid from users) t2 on t2.userid = t1.receiver WHERE sender=?'
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

blocksRouter.delete('/:id', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	pool.query('DELETE FROM blocks where id=?', req.params.id, (error, result) => {
		if (result) {
			res.status(200).end()
		} else if (error) {
			res.status(500).send(error)
		} else {
			res.status(500).send({ error: 'Database error' })
		}
	})
})

module.exports = blocksRouter