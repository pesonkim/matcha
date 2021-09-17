import { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import SubmitButton from '../ui/forms/SubmitButton'

let socket

const Chat = () => {
	const [name, setName] = useState('')
	const [room, setRoom] = useState('')
	const [message, setMessage] = useState([])
	const [messages, setMessages] = useState([])
	const ENDPOINT = 'localhost:3001'


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

	const sendMessage = (event) => {
		event.preventDefault()

		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''))
		}
	}

	console.log(messages)

	return (
		<Wrapper>
			<div>
				<input
					value={message}
					onChange={e => setMessage(e.target.value)}
					onKeyPress={e => e.key === 'Enter' ? sendMessage(event) : null}
				/>
			</div>
		</Wrapper>
	)
}

export default Chat