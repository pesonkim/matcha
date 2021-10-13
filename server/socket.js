const { Server } = require('socket.io')
const pool = require('./utils/db')

module.exports = (server) => {
	const io = new Server(server, {})

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
			const { error, user } = addUser({ socket: socket.id, id: data.id })

			if (error) {
				return callback(error)
			}
			console.log('new login:', user.socket, user.id)
			console.log('connections:', users)

			callback()
		})

		socket.on('sendMessage', ({ message: { receiver } }, callback) => {
			const isOnline = users.find(i => i.id === receiver)
			if (isOnline) {
				io.to(isOnline.socket).emit('message')
			}
			callback()
		})

		socket.on('sendNotification', ({ action, sender, receiver }, callback) => {
			const isOnline = users.find(i => i.id === receiver)
			if (isOnline) {
				if (action === 'like' || action === 'unlike') {
					io.to(isOnline.socket).emit('like', sender)
				} else {
					io.to(isOnline.socket).emit('notification', sender)
				}
			}
			callback()
		})

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
