const mysql = require('mysql')
const config = require('./config')
const logger = require('./logger')

const pool = mysql.createPool({
	host: config.DB_HOST,
	user: config.DB_USER,
	password: config.DB_PW,
	database: config.DB_NAME,
	connectionLimit: 10
})

pool.getConnection((err) => {
	logger.info('Connected to MySQL')
	if (err) {
		logger.error('Error connecting to MySQL', err.message)
	}
})

pool.on('connection', connection => {
	connection.on('error', error => {
		logger.error('Database error:', error.message)
	})
})

module.exports = pool