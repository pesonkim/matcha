const verifyRouter = require('express').Router()
const pool = require('../utils/db')
const mysql = require('mysql')

verifyRouter.get('/', (req, res) => {
	const token = req.query.token

	const sql = 'UPDATE users SET verified=1 WHERE token=?'
	const prepared = mysql.format(sql, token)
	pool.query(prepared, async (error, result) => {
		if (result) {
			console.log('Verify request, affected rows:', result.affectedRows)
			if (result.affectedRows === 1) {
				res.redirect('http://localhost:3000/verify')
			} else {
				res.redirect('http://localhost:3000/')
			}
		}
		else {
			return res.status(500).send({ error: 'Database error' })
		}
	})
})

module.exports = verifyRouter