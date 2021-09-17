const { Server } = require('socket.io')
const pool = require('./utils/db')
const mysql = require('mysql')

const { addUser, getUser, removeUser, getUsersInRoom } = require('./users')

module.exports = (server) => {
	const io = new Server(server, {
		cors: {
			origin: 'http://localhost:3000'
		}
	})

	io.on('connection', (socket) => {
		socket.on('join', ({ name, room }, callback) => {
			console.log('join')
			const { error, user } = addUser({ id: socket.id, name, room })

			if (error) {
				return callback(error)
			}
			console.log(user)
			socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
			socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` })

			socket.join(user.room)

			callback()
		})

		socket.on('sendMessage', (message, callback) => {
			const user = getUser(socket.id)

			io.to(user.room).emit('message', { user: user.name, text: message })

			callback()
		})

		socket.on('disconnect', () => {
			console.log('user disconnected')
		})
	})
}
