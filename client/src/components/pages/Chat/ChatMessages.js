import Message from './Message'
import { useEffect, useRef } from 'react'

const ChatMessages = ({ messages }) => {
	const divStyle = {
		height: '100%',
		overflow: 'auto',
	}

	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	return (
		<div className="py-2 sm:py-4" style={divStyle}>
			{messages.map((message) => <Message key={message.id} message={message} />)}
			<div ref={messagesEndRef} />
		</div>
	)
}

export default ChatMessages