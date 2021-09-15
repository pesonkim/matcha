const tagsRouter = require('express').Router()
const pool = require('../utils/db')
const mysql = require('mysql')

tagsRouter.get('/', (req, res) => {
	pool.query('SELECT * FROM tags', (error, result) => {
		if (error) {
			return res.status(500).send({ error })
		}
		if (result) {
			if (result[0]) {
				res.status(200).send(result[0].tags)
			} else {
				res.status(200).send(null)
			}
		}
		else {
			return res.status(500).send({ error: 'Database error' })
		}
	})
})

tagsRouter.post('/', (req, res) => {
	if (!req.body.tags) {
		return res.status(400).send({ error: 'Tags missing' })
	}

	const sql = 'UPDATE tags SET tags = ?'
	const prepared = mysql.format(sql, req.body.tags)
	pool.query(prepared, (error, result) => {
		if (result) {
			res.status(200).send()
		}
		else {
			return res.status(500).send({ error: 'Database error' })
		}
	})
})

module.exports = tagsRouter