const likesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET
const pool = require('../utils/db')
const mysql = require('mysql')

likesRouter.get('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const sql = 'SELECT * FROM likes WHERE sender=?'
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

likesRouter.post('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)
	const { from, to } = req.body

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	let sql = 'INSERT INTO likes (sender, receiver, created_at) VALUES (?,?,CURRENT_TIMESTAMP)'
	let prepared = mysql.format(sql, [from, to])
	// console.log(prepared)
	pool.query(prepared, (error, result) => {
		if (result) {
			console.log('New profile like:', result.insertId)
			pool.query(`UPDATE users SET fame = fame + 5 WHERE id = ${to}`)
			sql = 'SELECT * FROM likes WHERE (sender=? AND receiver=?) OR (sender=? AND receiver=?)'
			prepared = mysql.format(sql, [from, to, to, from])
			// console.log(prepared)
			pool.query(prepared, (error, result) => {
				if (result) {
					if (result.length === 2) {
						console.log('New match between ids:', to, from)
						pool.query(`UPDATE likes SET is_match = 1 WHERE id = ${result[0].id} OR id = ${result[1].id}`, (error, result) => {
							if (result) {
								return res.status(200).end()
							} else if (error) {
								return res.status(500).send(error)
							}
						})
					} else if (error) {
						return res.status(500).send(error)
					}
					return res.status(200).end()
				} else if (error) {
					return res.status(500).send(error)
				}
			})
		} else if (error) {
			return res.status(500).send(error)
		}
	})
})

likesRouter.put('/:id', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user || user.id !== Number(req.params.id)) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const sql = 'UPDATE likes SET is_seen=1 WHERE sender=? AND receiver=? AND id=?'
	const values = [
		user.id,
		req.body.to,
		req.body.id,
	]
	const prepared = mysql.format(sql, values)
	console.log(prepared)
	pool.query(prepared, (error, result) => {
		if (result) {
			return res.status(200).send(result)
		} else if (error) {
			return res.status(500).send(error)
		}
	})
})

likesRouter.delete('/:id', (req, res) => {
	// console.log(req.body)
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	pool.query('SELECT * FROM likes where id=?', req.params.id, (error, result) => {
		if (result) {
			if (result[0].is_match === 1) {
				console.log('Unmatching ids:', result[0].sender, result[0].receiver)
				pool.query(`UPDATE likes SET is_match = 0 WHERE (sender=${result[0].receiver} AND receiver=${result[0].sender})`, (error, result) => {
					if (result) {
						pool.query('DELETE FROM likes where id=?', req.params.id, (error, result) => {
							if (result) {
								pool.query(`UPDATE users SET fame = fame - 5 WHERE id = ${req.body.to}`)
								return res.status(200).end()
							} else if (error) {
								return res.status(500).send(error)
							}
						})
					} else if (error) {
						return res.status(500).send(error)
					}
				})
			} else {
				pool.query('DELETE FROM likes where id=?', req.params.id, (error, result) => {
					if (result) {
						pool.query(`UPDATE users SET fame = fame - 5 WHERE id = ${req.body.to}`)
						return res.status(200).end()
					} else if (error) {
						return res.status(500).send(error)
					}
				})
			}
		} else if (error) {
			return res.status(500).send(error)
		}
	})


})

module.exports = likesRouter