require('dotenv').config()

const IP = process.env.IP
const PORT = process.env.PORT
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PW = process.env.DB_PW
const DB_NAME = process.env.DB_NAME
const JWT_SECRET = process.env.JWT_SECRET
const EMAIL = process.env.EMAIL
const EMAIL_PW = process.env.EMAIL_PW

module.exports = {
	IP,
	PORT,
	DB_HOST,
	DB_USER,
	DB_PW,
	DB_NAME,
	JWT_SECRET,
	EMAIL,
	EMAIL_PW,
}