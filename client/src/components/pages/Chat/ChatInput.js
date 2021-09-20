const ChatInput = ({ message, setMessage, sendMessage }) => {
	const divStyle = {
		borderTopWidth: '2px',
		borderColor: '#dae4e9',
	}

	const inputStyle = {
		display: 'inline-block',
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderTopLeftRadius: '.5rem',
		borderBottomLeftRadius: '.5rem',
		width: '100%',
		padding: '.75rem',
	}

	const buttonStyle = {
		display: 'inline-block',
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderTopRightRadius: '.5rem',
		borderBottomRightRadius: '.5rem',
		padding: '.75rem',
		color: '#fff',
		background: '#2979FF',
	}

	return (
		<form className="w-full flex justify-between items-center p-4" style={divStyle}>
			<input
				style={inputStyle}
				type='text'
				maxLength='280'
				placeholder='Type a message...'
				value={message}
				onChange={e => setMessage(e.target.value)}
				onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
			/>
			<button
				style={buttonStyle}
				onClick={e => sendMessage(e)}
			>
				Send
			</button>
		</form>
	)
}

export default ChatInput