import { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from './InfoBar'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

let socket

const Chat = () => {
	const [name, setName] = useState('')
	const [room, setRoom] = useState('')
	const [message, setMessage] = useState([])
	const [messages, setMessages] = useState([])
	const ENDPOINT = 'localhost:3001'

	const container = {
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		padding: '.75rem',
		width: '100%',
		height: '38px'
	}

	useEffect(() => {
		const { name, room } = queryString.parse(window.location.search)

		socket = io(ENDPOINT)
		console.log(socket)

		setName(name)
		setRoom(room)

		socket.emit('join', { name, room }, () => {

		})

	}, [ENDPOINT, window.location.search])

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages(messages => [...messages, message])
		})
	}, [])

	useEffect(() => {
		return () => {
			socket.close()
		}
	}, [])

	const sendMessage = (event) => {
		event.preventDefault()

		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''))
		}
	}

	return (
		<div className='max-w-screen-sm mx-auto px-2'>
			<div className='flex flex-col justify-center my-4 bg-white rounded ui-shadow'>
				<InfoBar room={room} />
				<ChatMessages messages={messages} name={name} />
				<ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>
		</div>
	)
}

export default Chat