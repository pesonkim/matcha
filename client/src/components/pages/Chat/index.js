import { chatMessage } from '../../../reducers/matchReducer'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfoBar from './InfoBar'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

// console.log(socket)

const Chat = ({ profile }) => {
	const { id } = useSelector(state => state.user)
	const [message, setMessage] = useState([])
	const [messages, setMessages] = useState([])
	const dispatch = useDispatch()

	useEffect(() => {
		if (profile.chat.length) {
			setMessages(profile.chat)
			if (profile.chat.find(i => i.receiver === id && i.status === 0)) {
				// console.log('read')
				dispatch(chatMessage({ type: 'read', sender: profile.id, receiver: id }))
			}
		}
	}, [profile])

	const sendMessage = (event) => {
		event.preventDefault()

		if (message) {
			dispatch(chatMessage({ type: 'new', message: message, sender: id, receiver: profile.id }))
			setMessage('')
		}
	}

	return (
		<div className='max-w-screen-sm mx-auto px-2'>
			<div
				className='flex flex-col justify-center bg-white rounded ui-shadow h-screen'
				style={{ height: 'calc(100vh - (80px + 64px))', maxHeight: '800px' }}
			>
				<InfoBar user={profile} />
				<ChatMessages messages={messages} />
				<ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>
		</div>
	)
}

export default Chat