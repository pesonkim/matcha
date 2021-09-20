import ReactEmoji from 'react-emoji'

const Message = ({ message: { user, text }, name }) => {
	const messageStyle = {
		display: 'block',
		borderColor: '#dae4e9',
		borderRadius: '1rem',
		maxWidth: '80%',
		padding: '.75rem 1rem',
		background: '#F3F3F3',
	}

	const senderStyle = {
		display: 'block',
		borderColor: '#dae4e9',
		borderRadius: '1rem',
		maxWidth: '80%',
		padding: '1rem',
		background: '#2979FF',
		color: '#FFF',
	}

	let isSender = false

	const trimmedName = name.trim().toLowerCase()

	if(user === trimmedName) {
		isSender = true
	}

	return (
		isSender
			? (
				<div className='flex justify-end px-4 mt-1 items-center'>
					<p style={{ color: '#828282' }} className='pr-2'>{trimmedName}</p>
					<div style={senderStyle}>
						<p>{ReactEmoji.emojify(text)}</p>
					</div>
				</div>
			)
			: (
				<div className='flex justify-start px-4 mt-1 items-center'>
					<div style={messageStyle}>
						<p>{ReactEmoji.emojify(text)}</p>
					</div>
					<p style={{ color: '#828282' }} className='pl-2'>{user}</p>
				</div>
			)
	)
}

export default Message