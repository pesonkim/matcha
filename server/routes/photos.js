const photosRouter = require('express').Router()
const pool = require('../utils/db')
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const tokenSecret = require('../utils/config').TOKEN_SECRET
//const path = require('path')
//const fs = require('fs')

photosRouter.post('/', (req, res) => {
	console.log(req.body)
	const user = jwt.verify(req.token, tokenSecret)

	if (!user) {
		return res.status(401).send({ error: 'Invalid token or unauthorized' })
	}

	if (req.body.blob === null ) {
		return
	}

	/*
	const file = req.files.file
	//console.log(file)
	//const baseDir = path.join(__dirname, '../public/uploads')
	//const targetDir = path.join(baseDir, `/${user.id}`)

	const baseDir = path.join(__dirname, '../../public/uploads')
	//console.log(baseDir)
	const targetDir = path.join(baseDir, `/${user.id}`)

	//console.log(targetDir)
	if (!fs.existsSync(targetDir)) {
		fs.mkdirSync(targetDir, { recursive: true })
	}

	file.mv(`${baseDir}/${user.id}/${file.name}`, error => {
		if (error) {
			console.log(error)
			return res.status(500).send({ error })
		}

		return res.status(200).json({ filename: file.name, filepath: `${targetDir}/${file.name}` })
	})*/

	const sql = 'UPDATE users SET avatar = ? WHERE id = ?'
	const prepared = mysql.format(sql, [req.body.blob, user.id])
	//console.log(prepared)
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