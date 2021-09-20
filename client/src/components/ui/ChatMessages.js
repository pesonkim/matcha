import Message from './Message'
import { useEffect, useRef } from 'react'

const ChatMessages = ({ messages, name }) => {
	const divStyle = {
		height: '60vh',
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
		<div className="py-4" style={divStyle}>
			{messages.map((message, i) => <Message key={i} message={message} name={name} />)}
			<div ref={messagesEndRef} />
		</div>
	)
}

export default ChatMessages