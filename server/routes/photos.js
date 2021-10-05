const photosRouter = require('express').Router()
const pool = require('../utils/db')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET

photosRouter.post('/', (req, res) => {
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	if (req.body.blob === null ) {
		return
	}

	const sql = 'UPDATE users SET avatar = ? WHERE id = ?'
	const prepared = mysql.format(sql, [req.body.blob, user.id])
	pool.query(prepared, (error, result) => {
		if (error) {
			return res.status(500).send(error)
		}
		if (result) {
			return res.status(200).send({ blob: req.body.blob })
		} else {
			return res.status(500).send(error)
		}
	})
})

module.exports = photosRouter