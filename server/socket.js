const { Server } = require('socket.io')
const pool = require('./utils/db')
const mysql = require('mysql')

module.exports = (server) => {
	const io = new Server(server)

	io.on('connection', (socket) => {
		console.log('a user connected')
		socket.on('disconnect', () => {
			console.log('user disconnected')
		})
	})
}
