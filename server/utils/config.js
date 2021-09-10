require('dotenv').config()

const PORT = process.env.PORT
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PW = process.env.DB_PW
const DB_NAME = process.env.DB_NAME
const TOKEN_SECRET = process.env.TOKEN_SECRET

module.exports = {
	PORT,
	DB_HOST,
	DB_USER,
	DB_PW,
	DB_NAME,
	TOKEN_SECRET
}