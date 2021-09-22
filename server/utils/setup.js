const mysql = require('mysql')
const config = require('./config')
const logger = require('./logger')
const faker = require('faker')

const setupDb = async () => {
	const connection = mysql.createConnection({
		host: config.DB_HOST,
		user: config.DB_USER,
		password: config.DB_PW,
		multipleStatements: true
	})

	//creating empty database
	await connection.query(`
        DROP DATABASE IF EXISTS ${config.DB_NAME};
        CREATE DATABASE IF NOT EXISTS ${config.DB_NAME};`, (error) => {
		if (error) {
			logger.error('Error creating db:', error.message)
			return
		}
		logger.info(`Created database: ${config.DB_NAME}`)
	})

	//switching to new database
	await connection.query(`USE ${config.DB_NAME};`, (error) => {
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
		avatar mediumtext DEFAULT NULL,
        gender varchar(255) DEFAULT NULL,
        orientation varchar(255) DEFAULT NULL,
		tags varchar(255),
        bio text,
        latitude float DEFAULT NULL,
        longitude float DEFAULT NULL,
        birthdate date NOT NULL,
        fame int DEFAULT 100,
        last_login datetime DEFAULT NULL,
        online tinyint(1) NOT NULL DEFAULT 0
    )`

	const tags = `CREATE TABLE IF NOT EXISTS tags (
        tags varchar(5000) NOT NULL
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
	await connection.query(users, (error) => {
		if (error) {
			logger.error('Error creating table: users', error.message)
			return
		}
		logger.info('Created table: users')
	})

	await connection.query(tags, (error) => {
		if (error) {
			logger.error('Error creating table: tags', error.message)
			return
		}
		logger.info('Created table: tags')
	})

	await connection.query('INSERT INTO tags (tags) VALUES ("")', (error) => {
		if (error) {
			logger.error('Error creating table: tags', error.message)
			return
		}
	})

	await connection.query(likes, (error) => {
		if (error) {
			logger.error('Error creating table: likes', error.message)
			return
		}
		logger.info('Created table: likes')
	})

	await connection.query(views, (error) => {
		if (error) {
			logger.error('Error creating table: views', error.message)
			return
		}
		logger.info('Created table: views')
	})

	await connection.query(reports, (error) => {
		if (error) {
			logger.error('Error creating table: reports', error.message)
			return
		}
		logger.info('Created table: reports')
	})

	await connection.query(blocks, (error) => {
		if (error) {
			logger.error('Error creating table: blocks', error.message)
			return
		}
		logger.info('Created table: blocks')
	})

	await connection.query(messages, (error) => {
		if (error) {
			logger.error('Error creating table: messages', error.message)
			return
		}
		logger.info('Created table: messages')
	})

	await connection.query(notif, (error) => {
		if (error) {
			logger.error('Error creating table: notif', error.message)
			return
		}
		logger.info('Created table: notif')
	})

	//inserting dummy users into database, passwords are 'asd'
	//$2b$10$9rqOW.CL691TYklrt6mBM.nvrD9XRbKddQZRNjFB2vyaKnmz61gpe
	let dummy = 'INSERT INTO users (firstname, lastname, username, email, password, verified, avatar, gender, orientation, bio, latitude, longitude, birthdate, fame, last_login) VALUES'

	const gender = ['female', 'male', 'other']
	const orientation = ['fmo', 'fm', 'fo', 'mo', 'f', 'm', 'o']
	const locale = ['en', 'de', 'fr', 'es', 'fi', 'it']

	dummy = dummy.concat(`('firstname', 'lastname', 'admin', 'admin@example.com', '$2b$10$9rqOW.CL691TYklrt6mBM.nvrD9XRbKddQZRNjFB2vyaKnmz61gpe', 1, null, 'male', 'f', 'asd', null, null, '2000-01-01', 100, null),`)

	for (let i = 0; i < 500; i++) {
		let month = Math.ceil(Math.random() * 12)
		let day = Math.ceil(Math.random() * 28)
		let year = Math.floor(Math.random() * (2005 - 1980) + 1980)
		let birthdate = `${year}-${month}-${day}`
		faker.locale = locale[Math.floor(Math.random() * locale.length)]
		console.log(faker.locale)
		dummy = dummy.concat(`(
				'${faker.name.firstName().replace('\'', '')}',
				'${faker.name.lastName().replace('\'', '')}',
				'${faker.internet.userName()}',
				'${faker.internet.email()}',
				'$2b$10$9rqOW.CL691TYklrt6mBM.nvrD9XRbKddQZRNjFB2vyaKnmz61gpe',
				1,
				'${faker.internet.avatar()}',
				'${gender[Math.floor(Math.random() * gender.length)]}',
				'${orientation[Math.floor(Math.random() * orientation.length)]}',
				'${faker.lorem.sentence()}',
				'${faker.address.latitude()}',
				'${faker.address.longitude()}',
				'${birthdate}',
				100,
				CURRENT_TIMESTAMP - INTERVAL FLOOR(RAND() * 30) DAY
			)`)
		if (i < 499) {
			dummy = dummy.concat(',')
		}
	}

	const prepared = mysql.format(dummy)
	//console.log(prepared)

	await connection.query(prepared, (error) => {
		if (error) {
			// console.log(error)
			logger.error('Error creating dummy users', error.message)
			return
		}
		logger.info('Created dummy users')
		logger.info(`Finished setting up database: ${config.DB_NAME}`)
	})

	connection.end()
}

module.exports = setupDb