const matchRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').JWT_SECRET
const pool = require('../utils/db')
const mysql = require('mysql')

matchRouter.get('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	let sql = 'SELECT receiver, created_at FROM likes WHERE sender=? AND is_match=1'
	let prepared = mysql.format(sql, [user.id])
	pool.query(prepared, (error, result) => {
		if (result) {
			if (result.length) {
				const created = result
				sql = 'SELECT id, firstname, lastname, username, avatar, gender, orientation, tags, bio, latitude, longitude,\
TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) AS age, fame, last_login, online from users WHERE ('
				for (let i = 0; i < result.length; i++) {
					sql = sql.concat(`id = '${result[i].receiver}'`)
					if (i < result.length - 1) {
						sql = sql.concat(' OR ')
					}
				}
				sql = sql.concat(')')
				pool.query(sql, (error, result) => {
					if (result) {
						result.map(i => {
							i.created_at = created.find(c => c.receiver === i.id).created_at
						})
						return res.status(200).send(result)
					} else if (error) {
						return res.status(500).send(error)
					}
				})
			} else {
				return res.status(200).send([])
			}
		} else if (error) {
			return res.status(500).send(error)
		}
	})
})

matchRouter.get('/likes', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	const sql = 'SELECT sender FROM likes WHERE receiver=?'
	const values = [
		user.id
	]
	const prepared = mysql.format(sql, values)
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

module.exports = matchRouter