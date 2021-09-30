import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getMatches } from '../../reducers/matchReducer'
import { Link } from 'react-router-dom'
import ReactEmoji from 'react-emoji'

const MatchPreview = ({ user }) => {
	const { id } = useSelector(state => state.user)
	const { chats } = useSelector(state => state.match)
	const [message, setMessage] = useState(null)

	useEffect(() => {
		if (chats && chats.length) {
			let last = chats.filter(i => i.sender === id && i.receiver === user.id || i.sender === user.id && i.receiver === id)
			last ? setMessage(last[last.length - 1]) : setMessage('Say hi to your new match 👋')
		}
	}, [chats])

	const divideStyle = {
		marginTop: '-1px',
		borderBottomWidth: '1px',
		borderColor: '#dae4e9',
	}

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
			<Link to={`/chat/${user.id}`} className='flex flex-col w-full h-16 sm:h-20 pl-4 justify-center overflow-hidden'>
				<span className='text-xl sm:text-2xl'>{user.firstname}</span>
				<span className='truncate text-sm sm:text-base'>{message ? message.message : 'Say hi to your new match 👋'}</span>
				<div className='bg-gradient-to-r from-transparent to-white absolute right-0 w-1/4 h-full rounded'></div>
			</Link>
			<div className='absolute right-0 top-0 w-3/4 sm:w-4/5 mx-4' style={divideStyle}></div>
		</div>
	)
}

{/* <Link key={profile.id} to={`/browse/${profile.id}`}>
<Preview user={profile} />
</Link> */}

const Matches = () => {
	const dispatch = useDispatch()
	const { matches } = useSelector(state => state.match)

	const fieldStyle = {
		borderTopWidth: '1px',
		borderColor: '#dae4e9',
	}

	useEffect(async () => {
		await dispatch(getMatches())
	}, [dispatch])

	return (
		<div className='max-w-screen-sm mx-auto px-2 slideDown'>
			<div className='flex flex-col justify-center my-4 bg-white rounded ui-shadow'>
				<h1 className='text-2xl sm:text-3xl text-center p-4'>
					Matches
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