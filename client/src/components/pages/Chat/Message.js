import { useSelector } from 'react-redux'

const Message = ({ message: { sender, message } }) => {
	const { id } = useSelector(state => state.user)

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

	return (
		sender === id
			? (
				<div className='flex justify-end px-4 mt-1 items-center overflow-ellipsis overflow-hidden break-words'>
					<div style={senderStyle}>
						<p>{message}</p>
					</div>
				</div>
			)
			: (
				<div className='flex justify-start px-4 mt-1 items-center overflow-ellipsis overflow-hidden break-words'>
					<div style={messageStyle}>
						<p>{message}</p>
					</div>
				</div>
			)
	)
}

export default Message