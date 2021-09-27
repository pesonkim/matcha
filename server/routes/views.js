const viewsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET
const pool = require('../utils/db')
const mysql = require('mysql')

viewsRouter.get('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	res.status(200).end()
})

viewsRouter.post('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	let sql = 'UPDATE users SET fame=fame+1 WHERE id=? AND NOT EXISTS (SELECT id from views WHERE sender=? AND receiver=?)'
	let prepared = mysql.format(sql, [req.body.to, req.body.from, req.body.to])
	// console.log(prepared)
	pool.query(prepared, (error, result) => {
		if (result) {
			sql = 'INSERT INTO views (sender, receiver, created_at) VALUES (?,?,CURRENT_TIMESTAMP)'
			const values = [
				req.body.from,
				req.body.to,
			]
			prepared = mysql.format(sql, values)
			// console.log(prepared)
			pool.query(prepared, (error, result) => {
				if (result) {
					console.log('New profile view:', result.insertId)
					res.status(200).end()
				} else if (error) {
					res.status(500).send(error)
				} else {
					res.status(500).send({ error: 'Database error' })
				}
			})
		}
		if (error) {
			return res.status(500).send(error)
		}
	})


})

module.exports = viewsRouter
