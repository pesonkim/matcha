const verifyRouter = require('express').Router()
const pool = require('../utils/db')
const mysql = require('mysql')
const getToken = require('../utils/token')

verifyRouter.get('/', (req, res) => {
	const token = req.query.token
	const newToken = getToken()

	const sql = 'UPDATE users SET verified=1, token=? WHERE token=?'
	const prepared = mysql.format(sql, [newToken, token])
	pool.query(prepared, async (error, result) => {
		if (result) {
			console.log('Verify request, affected rows:', result.affectedRows)
			if (result.affectedRows === 1) {
				res.redirect('http://localhost:3000/verify')
			} else {
				res.redirect('http://localhost:3000/login')
			}
		}
		else {
			return res.status(500).send({ error: 'Database error' })
		}
	})
})

module.exports = verifyRouter