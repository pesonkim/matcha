const { Server } = require('socket.io')
const pool = require('./utils/db')
const mysql = require('mysql')

module.exports = (server) => {
	const io = new Server(server, {
		cors: {
			origin: 'http://localhost:3000'
		}
	})

	let users = []

	const addUser = ({ socket, id }) => {
		const existingUser = users.find(user => user.id === id)
		if (existingUser) return { error: 'User is already logged in' }

		const user = { socket, id }

		users.push(user)
		pool.query(`UPDATE users SET online=1, last_login = CURRENT_TIMESTAMP WHERE id = ${id}`)
		return { user }
	}

	const removeUser = (id) => {
		const index = users.findIndex(user => user.socket === id)

		if (index !== -1) {
			return users.splice(index, 1)[0]
		}
	}

	io.on('connection', (socket) => {
		socket.on('login', ({ data }, callback) => {
			// console.log(data)
			const { error, user } = addUser({ socket: socket.id, id: data.id })

			if (error) {
				return callback(error)
			}
			console.log('new login:', user.socket, user.id)
			console.log('connections:', users)

			callback()
		})

		socket.on('sendMessage', ({ message: { message, sender, receiver } }, callback) => {
			// console.log(message, sender, receiver)
			const isOnline = users.find(i => i.id === receiver)
			console.log('is online', isOnline)
			if (isOnline) {
				io.to(isOnline.socket).emit('message')
			}
			callback()
		})

		socket.on('sendNotification', ({ action, sender, receiver }, callback) => {
			// console.log(action, sender, receiver)
			const isOnline = users.find(i => i.id === receiver)
			console.log('is online', isOnline)
			if (isOnline) {
				io.to(isOnline.socket).emit('notification')
			}
			callback()
		})

		// socket.on('sendMessage', (messageData, callback) => {
		// 	const { sender, receiver, message } = messageData

		// 	const sql = 'INSERT INTO messages (sender, receiver, message, created_at) VALUES (?,?,?,CURRENT_TIMESTAMP)'
		// 	const prepared = mysql.format(sql, [sender, receiver, message])
		// 	console.log(prepared)
		// 	pool.query(prepared, (error, result) => {
		// 		if (result) {

		// 		} else if (error) {
		// 			return callback(error)
		// 		}
		// 	})
		// 	io.to(user.room).emit('message', { user: user.name, text: message })
		// 	io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

		// 	callback()
		// })
		// socket.on('join', ({ name, room }, callback) => {
		// 	//console.log('join')
		// 	const { error, user } = addUser({ id: socket.id, name, room })

		// 	if (error) {
		// 		return callback(error)
		// 	}
		// 	console.log(user)
		// 	socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
		// 	socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined` })

		// 	socket.join(user.room)

		// 	io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

		// 	callback()
		// })

		// socket.on('sendMessage', (message, callback) => {
		// 	const user = getUser(socket.id)

		// 	io.to(user.room).emit('message', { user: user.name, text: message })
		// 	io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

		// 	callback()
		// })

		socket.on('disconnect', () => {
			const user = removeUser(socket.id)

			if (user) {
				pool.query(`UPDATE users SET online=0, last_login = CURRENT_TIMESTAMP WHERE id = ${user.id}`)
				console.log('user disconnect', user.socket, user.id)
			}
			console.log('connections', users)
		})
	})
}
