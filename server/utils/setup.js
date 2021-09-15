const mysql = require('mysql')
const config = require('./config')
const logger = require('./logger')

const setupDb = () => {
	const connection = mysql.createConnection({
		host: config.DB_HOST,
		user: config.DB_USER,
		password: config.DB_PW,
		multipleStatements: true
	})

	//creating empty database
	connection.query(`
        DROP DATABASE IF EXISTS ${config.DB_NAME};
        CREATE DATABASE IF NOT EXISTS ${config.DB_NAME};`, (error) => {
		if (error) {
			logger.error('Error creating db:', error.message)
			return
		}
		logger.info(`Created database: ${config.DB_NAME}`)
	})

	//switching to new database
	connection.query(`USE ${config.DB_NAME};`, (error) => {
		if (error) {
			logger.error('Error connecting to db:', error.message)
			return
		}
		logger.info(`Connected to database: ${config.DB_NAME}`)
	})

	//defining each individual table
	const users = `CREATE TABLE IF NOT EXISTS users (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        firstname varchar(50) NOT NULL,
        lastname varchar(50) NOT NULL,
        username varchar(50) UNIQUE NOT NULL,
        email varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        token varchar(255) NOT NULL DEFAULT 0,
        verified tinyint(1) NOT NULL DEFAULT 0,
        gender varchar(255) DEFAULT NULL,
        orientation varchar(255) DEFAULT NULL,
        avatar int DEFAULT NULL,
		tags varchar(255),
        bio text,
        latitude float DEFAULT NULL,
        longitude float DEFAULT NULL,
        birthdate date NOT NULL,
        fame int DEFAULT 0,
        last_login datetime DEFAULT NULL,
        online tinyint(1) NOT NULL DEFAULT 0
    )`

	const tags = `CREATE TABLE IF NOT EXISTS tags (
        tags varchar(5000) NOT NULL
    )`

	const photos = `CREATE TABLE IF NOT EXISTS photos (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        src varchar(5000) NOT NULL,
        user int NOT NULL,
        FOREIGN KEY (user) REFERENCES users(id)
    )`

	const likes = `CREATE TABLE IF NOT EXISTS likes (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        liker int NOT NULL,
        liked int NOT NULL,
        is_match tinyint(1) NOT NULL DEFAULT 0,
        created_at datetime NOT NULL,
        FOREIGN KEY (liker) REFERENCES users(id),
        FOREIGN KEY (liked) REFERENCES users(id)
    )`

	const views = `CREATE TABLE IF NOT EXISTS views (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        viewer int NOT NULL,
        viewed int NOT NULL,
        created_at datetime NOT NULL,
        status tinyint(1) NOT NULL DEFAULT 0,
        FOREIGN KEY (viewer) REFERENCES users(id),
        FOREIGN KEY (viewed) REFERENCES users(id)
    )`

	const blocks = `CREATE TABLE IF NOT EXISTS blocks (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        blocker int NOT NULL,
        blocked int NOT NULL,
        FOREIGN KEY (blocker) REFERENCES users(id),
        FOREIGN KEY (blocked) REFERENCES users(id)
    )`

	const reports = `CREATE TABLE IF NOT EXISTS reports (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        reporter int NOT NULL,
        reported int NOT NULL,
        FOREIGN KEY (reporter) REFERENCES users(id),
        FOREIGN KEY (reported) REFERENCES users(id)
    )`

	const messages = `CREATE TABLE IF NOT EXISTS messages (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        sender int NOT NULL,
        receiver int NOT NULL,
        message text,
        created_at datetime NOT NULL,
        status tinyint(1) NOT NULL DEFAULT 0,
        FOREIGN KEY (sender) REFERENCES users(id),
        FOREIGN KEY (receiver) REFERENCES users(id)
    )`

	const notif = `CREATE TABLE IF NOT EXISTS notif (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        sender int NOT NULL,
        receiver int NOT NULL,
        message text,
        created_at datetime NOT NULL,
        status tinyint(1) NOT NULL DEFAULT 0,
        user int NOT NULL,
        FOREIGN KEY (sender) REFERENCES users(id),
        FOREIGN KEY (receiver) REFERENCES users(id)
    )`

	//executing queries to create tables
	connection.query(users, (error) => {
		if (error) {
			logger.error('Error creating table: users', error.message)
			return
		}
		logger.info('Created table: users')
	})

	connection.query(tags, (error) => {
		if (error) {
			logger.error('Error creating table: tags', error.message)
			return
		}
		logger.info('Created table: tags')
	})

	connection.query('INSERT INTO tags (tags) VALUES ("")', (error) => {
		if (error) {
			logger.error('Error creating table: tags', error.message)
			return
		}
	})

	connection.query(photos, (error) => {
		if (error) {
			logger.error('Error creating table: photos', error.message)
			return
		}
		logger.info('Created table: photos')
	})

	connection.query(likes, (error) => {
		if (error) {
			logger.error('Error creating table: likes', error.message)
			return
		}
		logger.info('Created table: likes')
	})

	connection.query(views, (error) => {
		if (error) {
			logger.error('Error creating table: views', error.message)
			return
		}
		logger.info('Created table: views')
	})

	connection.query(reports, (error) => {
		if (error) {
			logger.error('Error creating table: reports', error.message)
			return
		}
		logger.info('Created table: reports')
	})

	connection.query(blocks, (error) => {
		if (error) {
			logger.error('Error creating table: blocks', error.message)
			return
		}
		logger.info('Created table: blocks')
	})

	connection.query(messages, (error) => {
		if (error) {
			logger.error('Error creating table: messages', error.message)
			return
		}
		logger.info('Created table: messages')
	})

	connection.query(notif, (error) => {
		if (error) {
			logger.error('Error creating table: notif', error.message)
			return
		}
		logger.info('Created table: notif')
	})

	//inserting dummy users into database, passwords are 'asd'
	//$2b$10$9rqOW.CL691TYklrt6mBM.nvrD9XRbKddQZRNjFB2vyaKnmz61gpe
	const dummy = `INSERT INTO users (username, firstname, lastname, email, verified, birthdate, token, password) VALUES
		('admin', 'firstname', 'lastname', 'admin@example.com', 1, '2000-01-01', 'asd', '$2b$10$9rqOW.CL691TYklrt6mBM.nvrD9XRbKddQZRNjFB2vyaKnmz61gpe'),
		('test', 'firstname', 'lastname', 'test@example.com', 0, '2000-01-01', 'asd123', '$2b$10$9rqOW.CL691TYklrt6mBM.nvrD9XRbKddQZRNjFB2vyaKnmz61gpe'),
		('kimmi', 'firstname', 'lastname', 'pesonkim@gmail.com', 1, '1992-04-08', 'asdasd', '$2b$10$OtdoKvY2JKiVc8bOqlIoQeGjIgJcKtgShpI70mHInGv9OCryWUwzi')`

	connection.query(dummy, (error) => {
		if (error) {
			logger.error('Error creating dummy users', error.message)
			return
		}
		logger.info('Created dummy users')
		logger.info(`Finished setting up database: ${config.DB_NAME}`)
	})

	connection.end()
}

module.exports = setupDb