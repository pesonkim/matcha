import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MatchPreview = ({ user }) => {
	const { id } = useSelector(state => state.user)
	const { matches } = useSelector(state => state.match)
	const [unreadMessages, setUnreadMessages] = useState(null)

	const divideStyle = {
		marginTop: '-1px',
		borderBottomWidth: '1px',
		borderColor: '#dae4e9',
	}

	useEffect(() => {
		if (matches) {
			// console.log('header')
			let count = 0
			matches.map(i => {
				if (i.chat.length) {
					i.chat.map(message => message.sender === user.id && message.status === 0 ? count++ : null)
				}
			})
			if (count) {
				count < 99 ? setUnreadMessages(count) : setUnreadMessages(99)
			} else {
				setUnreadMessages(null)
			}
		}
	}, [matches])

	return (
		<div className='w-full flex items-center p-2 relative'>
			<div className='w-16 sm:w-20'>
				<Link to={`/matches/${user.id}`}>
					<div className='w-16 h-16 sm:w-20 sm:h-20 relative'>
						<img src={user.avatar} className='h-full w-full rounded-full object-cover shadow' />
						<div className='absolute top-1/2 left-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full shadow '>
							{user.online
								? <div className='bg-green-500 h-4 w-4 rounded-full'></div>
								: <div className='bg-red-500 h-4 w-4 rounded-full'></div>
							}
						</div>
					</div>
				</Link>
			</div>
			<Link to={`/chat/${user.id}`} className='flex flex-col w-full h-16 sm:h-20 pl-4 justify-center overflow-hidden relative'>
				<span className='truncate text-xl sm:text-2xl'>{user.firstname}</span>
				<span className='truncate text-sm sm:text-base text-gray-500 flex flex-row flex-nowrap'>
					{user.chat.length
						? user.chat[user.chat.length - 1].sender === id
							? (<div className="flex text-center items-center">
								<svg className="h-4 w-4 text-gray-500 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z"></path></svg>
								{user.chat[user.chat.length - 1].message}
							</div>
							)
							: user.chat[user.chat.length - 1].message

						: 'Say hi to your new match 👋'}
				</span>
				<div className='absolute right-0 bg-white w-6 h-full rounded'></div>
				<div className='bg-gradient-to-r from-transparent to-white absolute right-0 w-12 mr-6 h-full rounded'></div>
				{unreadMessages &&
					<div
						className='absolute w-6 h-6 top-1/2 right-3 transform -translate-y-1/2 rounded-full inline-block text-white bg-red-500 text-center'
						style={{ lineHeight: '1.5rem' }}
					>
						<span className='z-10 relative'>
							{unreadMessages}
						</span>
						<span className='z-0 absolute bg-red-500 animate-ping w-6 h-6 top-0 left-0 rounded-full overflow-visible'>
						</span>
					</div>
				}
			</Link>
			<div className='absolute right-0 top-0 w-3/4 sm:w-4/5 mx-4' style={divideStyle}></div>
		</div>
	)
}

const Matches = () => {
	const { matches } = useSelector(state => state.match)

	const fieldStyle = {
		borderTopWidth: '1px',
		borderColor: '#dae4e9',
	}

	return (
		<div className='max-w-screen-sm mx-auto px-2 slideDown'>
			<div className='flex flex-col justify-center bg-white rounded ui-shadow'>
				<h1 className='text-2xl sm:text-3xl text-center p-2 sm:p-4'>
					Messages
				</h1>
				{matches.length
					? <div className="" style={fieldStyle}>
						{matches.map(user => <MatchPreview key={user.id} user={user} />)}
					</div>
					: <div className="flex justify-center items-center p-4" style={fieldStyle}>
						You have not matched with anyone yet
					</div>
				}
			</div>
		</div>
	)
}

export default Matches