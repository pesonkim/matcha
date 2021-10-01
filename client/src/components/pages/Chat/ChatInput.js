import { EmojiHappyIcon } from '@heroicons/react/outline'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { useEffect, useState } from 'react'

const ChatInput = ({ message, setMessage, sendMessage }) => {
	const [showEmojis, setShowEmojis] = useState(false)

	const handler = (event) => {
		const parent = document.getElementById('emojipicker')
		if (parent && !parent.contains(event.target)) {
			setShowEmojis(false)
		}
	}

	useEffect(() => {
		if (showEmojis) {
			window.addEventListener('click', handler)
			return () => {
				window.removeEventListener('click', handler)
			}
		}
	}, [showEmojis])

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
		paddingRight: '2.75rem',
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
		userSelect: 'none',
	}

	return (
		<form className="w-full flex justify-between items-center p-4 relative" style={divStyle}>
			<input
				style={inputStyle}
				type='text'
				maxLength='280'
				placeholder='Type a message...'
				value={message}
				onChange={e => setMessage(e.target.value)}
				onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
			/>
			{showEmojis && (
				<div className='absolute bottom-3/4 right-20 mx-auto mb-1 ml-4' id='emojipicker'>
					<Picker
						onSelect={e => setMessage(message + e.native)}
						style={{ width: '100%' }}
					/>
				</div>
			)}
			<div className='absolute p-3 top-1/2 right-16 transform -translate-y-1/2 cursor-pointer'>
				<EmojiHappyIcon className='h-8 w-8 mr-3 text-gray-400' onClick={() => setShowEmojis(!showEmojis)} />
			</div>
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