const messagesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').JWT_SECRET
const pool = require('../utils/db')
const mysql = require('mysql')

messagesRouter.get('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const sql = 'SELECT * FROM messages WHERE sender=? OR receiver=?'
	const prepared = mysql.format(sql, [user.id, user.id])
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

messagesRouter.post('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const sql = 'INSERT INTO messages (sender, receiver, message, created_at) VALUES (?,?,?,CURRENT_TIMESTAMP)'
	const values = [
		req.body.sender,
		req.body.receiver,
		req.body.message,
	]
	const prepared = mysql.format(sql, values)
	pool.query(prepared, (error, result) => {
		if (result) {
			return res.status(204).end()
		} else if (error) {
			return res.status(500).send(error)
		}
	})
})

messagesRouter.put('/:id', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user || user.id !== Number(req.params.id)) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const sql = 'UPDATE messages SET status=1 WHERE receiver=? AND sender=?'
	const values = [
		user.id,
		req.body.sender
	]
	const prepared = mysql.format(sql, values)
	pool.query(prepared, (error, result) => {
		if (result) {
			return res.status(200).send(result)
		} else if (error) {
			return res.status(500).send(error)
		}
	})
})

module.exports = messagesRouter