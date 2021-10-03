const notifRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET
const pool = require('../utils/db')
const mysql = require('mysql')

notifRouter.get('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const sql = `SELECT notif.*,
		sender.firstname AS sendername,
		sender.avatar AS avatar,
		receiver.firstname AS receivername
		FROM notif
		LEFT JOIN users AS sender
		ON sender.id = notif.sender
		LEFT JOIN users AS receiver
		ON receiver.id = notif.receiver
		WHERE sender =? or receiver =?`
	const values = [
		user.id,
		user.id,
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

notifRouter.post('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const sql = 'INSERT INTO notif (sender, receiver, action, created_at) VALUES (?,?,?,CURRENT_TIMESTAMP)'
	const values = [
		req.body.sender,
		req.body.receiver,
		req.body.action,
	]
	const prepared = mysql.format(sql, values)
	console.log(prepared)
	pool.query(prepared, (error, result) => {
		if (result) {
			return res.status(200).end()
		} else if (error) {
			return res.status(500).send(error)
		}
	})
})

notifRouter.put('/:id', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user || user.id !== Number(req.params.id)) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const ids = req.body
	let sql = 'UPDATE notif SET status=1 WHERE receiver=? AND ('
	for (let i = 0; i < ids.length; i++) {
		sql = sql.concat(`id = '${ids[i]}'`)
		if (i < ids.length - 1) {
			sql = sql.concat(' OR ')
		}
	}
	sql = sql.concat(')')
	const prepared = mysql.format(sql, [user.id])
	// console.log(prepared)
	pool.query(prepared, (error, result) => {
		if (result) {
			return res.status(200).send(result)
		} else if (error) {
			return res.status(500).send(error)
		}
	})
})

module.exports = notifRouter