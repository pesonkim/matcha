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
        token varchar(255) NOT NULL,
        verified tinyint(1) NOT NULL DEFAULT 0,
        gender
        orientation
        avatar
        bio
        latitude
        longitude
        age
        fame
        last_online
        online
    )`

    //FOREIGN KEY (id_user) REFERENCES users(id_user)
    const tags = `CREATE TABLE IF NOT EXISTS tags (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        tag varchar(255) NOT NULL,
        FOREIGN KEY (user) REFERENCES users(id)
    )`

    const photos = `CREATE TABLE IF NOT EXISTS photos (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        src varchar(5000) NOT NULL,
        user int NOT NULL,
        FOREIGN KEY (user) REFERENCES users(id)
    )`

    const likes = `CREATE TABLE IF NOT EXISTS likes (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        to int NOT NULL,
        from int NOT NULL,
        created_at datetime NOT NULL,
        status tinyint(1) NOT NULL DEFAULT 0,
        FOREIGN KEY (from) REFERENCES users(id),
        FOREIGN KEY (to) REFERENCES users(id)
    )`

    const views = `CREATE TABLE IF NOT EXISTS views (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        to int NOT NULL,
        from int NOT NULL,
        created_at datetime NOT NULL,
        status tinyint(1) NOT NULL DEFAULT 0,
        FOREIGN KEY (from) REFERENCES users(id),
        FOREIGN KEY (to) REFERENCES users(id)
    )`

    const blocks = `CREATE TABLE IF NOT EXISTS blocks (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        to int NOT NULL,
        from int NOT NULL,
        FOREIGN KEY (from) REFERENCES users(id),
        FOREIGN KEY (to) REFERENCES users(id)
    )`

    const reports = `CREATE TABLE IF NOT EXISTS reports (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        to int NOT NULL,
        from int NOT NULL,
        FOREIGN KEY (from) REFERENCES users(id),
        FOREIGN KEY (to) REFERENCES users(id)
    )`

    const messages = `CREATE TABLE IF NOT EXISTS messages (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        to int NOT NULL,
        from int NOT NULL,
        message text,
        created_at datetime NOT NULL,
        status tinyint(1) NOT NULL DEFAULT 0,
        FOREIGN KEY (from) REFERENCES users(id),
        FOREIGN KEY (to) REFERENCES users(id)
    )`

    const notif = `CREATE TABLE IF NOT EXISTS notif (
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
        to int NOT NULL,
        from int NOT NULL,
        message text,
        created_at datetime NOT NULL,
        status tinyint(1) NOT NULL DEFAULT 0,
        user int NOT NULL,
        FOREIGN KEY (user) REFERENCES users(id)
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
        logger.info(`Finished setting up database: ${config.DB_NAME}`)
    })

    //inserting dummy users into database

    connection.end()
}

module.exports = setupDb