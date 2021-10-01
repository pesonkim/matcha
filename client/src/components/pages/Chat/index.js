import { newMessage } from '../../../reducers/matchReducer'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfoBar from './InfoBar'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

import io from 'socket.io-client'
const endpoint = process.env.REACT_APP_ENDPOINT
const socket = io(endpoint)
console.log(socket)

const Chat = ({ profile }) => {
	const { id } = useSelector(state => state.user)
	const [message, setMessage] = useState([])
	const [messages, setMessages] = useState([])
	const ENDPOINT = 'localhost:3001'
	const dispatch = useDispatch()

	// const container = {
	// 	borderWidth: '1px',
	// 	borderColor: '#dae4e9',
	// 	borderRadius: '.25rem',
	// 	padding: '.75rem',
	// 	width: '100%',
	// 	height: '38px'
	// }

	// useEffect(() => {
	// 	const { name, room } = queryString.parse(window.location.search)

	// 	socket = io(ENDPOINT)
	// 	console.log(socket)

	// 	setName(name)
	// 	setRoom(room)

	// 	socket.emit('join', { name, room }, () => {

	// 	})

	// }, [ENDPOINT, window.location.search])


	// useEffect(() => {
	// 	return () => {
	// 		socket.close()
	// 	}
	// }, [])

	useEffect(() => {
		if (profile.chat.length) {
			setMessages(profile.chat)
		}
	}, [profile])

	const sendMessage = (event) => {
		event.preventDefault()

		if (message) {
			dispatch(newMessage({ message: message, sender: id, receiver: profile.id }))
			setMessage('')
		// socket.emit('sendMessage', { message: message, sender: id, receiver: profile.id }, () => setMessage(''))
		}
	}

	return (
		<div className='max-w-screen-sm mx-auto px-2'>
			<div className='flex flex-col justify-center my-4 bg-white rounded ui-shadow'>
				<InfoBar user={profile} />
				<ChatMessages messages={messages} />
				<ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>
		</div>
	)
}

export default Chat