import { useDispatch, useSelector } from 'react-redux'
import { MailOpenIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as MatchIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'
import moment from 'moment-twitter'
import { readNotif } from '../../reducers/matchReducer'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useEffect, useRef, useState } from 'react'

const MarkAsRead = ({ readAll }) => (
	<div
		className="flex justify-center p-2 sm:p-4 select-none cursor-pointer hover:underline"
		style={{
			borderTopWidth: '1px',
			borderColor: '#dae4e9',
			color: '#3490dc',
		}}
		onClick={() => readAll()}
	>
		<MailOpenIcon className=' h-5 w-5 mr-2' />
		<span>Mark all as read</span>
	</div>
)

const Notification = ({ notif, readOne }) => {
	const { likes, matches, publicLikes } = useSelector(state => state.match)

	const divideStyle = {
		marginTop: '-1px',
		borderBottomWidth: '1px',
		borderColor: '#dae4e9',
	}

	const handleClick = () => {
		if (notif.id && notif.status === 0) {
			readOne(notif.id)
		}
	}

	const isMatch = matches.find(i => i.id === notif.sender)
	const isLiked = likes.find(i => i.receiver === notif.sender)
	const hasLiked = publicLikes.find(i => i.sender === notif.sender)

	const notifMessage = () => {
		switch (notif.action) {
		case 'view':
			return 'Viewed your profile'
		case 'like':
			return isLiked ? 'Matched with you' : 'Liked you'
		case 'unlike':
			return isLiked ? 'Unmatched with you' : 'Unliked you'
		}
	}

	return (
		<div
			className='w-full flex items-center p-2 relative'
			onClick={handleClick}
			style={notif.status === 0 ? { cursor: 'pointer', backgroundColor: 'rgba(248,247,251,255)' } : null}
		>
			<div className='w-12 sm:w-14' style={notif.status === 0 ? { marginLeft: '1.5rem' } : { marginLeft: '0.5rem' }}>
				<Link to={`/browse/${notif.sender}`}>
					<div className='w-10 h-10 sm:w-14 sm:h-14 relative'>
						<img src={notif.avatar} alt='avatar' className='h-full w-full rounded-full object-cover shadow' />
						<div className='absolute top-1/2 left-full transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow '>
							{isMatch
								? <MatchIcon className='h-6 w-6 text-pink-500' />
								: isLiked
									? <HeartIcon className='h-6 w-6 text-pink-500' />
									: hasLiked
										? <HeartIcon className='h-6 w-6 text-pink-500 ' />
										: null
							}
						</div>
					</div>
				</Link>
				{notif.status === 0 &&
					<div
						className='absolute w-4 h-4 top-1/2 left-2 transform -translate-y-1/2 rounded-full inline-block text-white bg-red-500 text-center'
						style={{ lineHeight: '1.5rem' }}
					>
						<span className='z-0 absolute animate-ping bg-red-500 w-4 h-4 top-0 left-0 rounded-full overflow-visible'>
						</span>
					</div>
				}
			</div>
			<div className='flex flex-row justify-between w-full overflow-hidden' style={isLiked ? { marginLeft: '0.5rem' } : hasLiked ? { marginLeft: '0.5rem' } : null }>
				<div className='flex flex-col h-12 sm:h-14 pl-2 justify-center overflow-hidden relative'>
					<Link to={`/browse/${notif.sender}`} >
						<span className='truncate text-lg'>{notif.sendername}</span>
					</Link>
					<span className='truncate text-sm sm:text-base text-gray-500 flex flex-row flex-nowrap select-none'>
						{notifMessage()}
					</span>
				</div>
				<div className='flex flex-col justify-center mr-2'>
					<div className='absolute right-0 bg-white w-12 h-full rounded'></div>
					<div className='bg-gradient-to-r from-transparent to-white absolute right-0 w-20 mr-12 h-full rounded'></div>
					<span className='text-sm sm:text-base text-gray-500 z-10 select-none'>
						{moment(notif.created_at).twitterShort()}
					</span>
				</div>
			</div>
			<div className='absolute right-0 top-0 w-full' style={divideStyle}></div>
		</div>
	)
}

const Notifications = () => {
	const { id } = useSelector(state => state.user)
	const { notif } = useSelector(state => state.match)
	const [items, setItems] = useState([])
	const hasMore = useRef(true)
	const dispatch = useDispatch()

	const fieldStyle = {
		borderTopWidth: '1px',
		borderColor: '#dae4e9',
		height: '100%',
		overflow: 'auto',
	}

	const readAll = () => {
		const unread = notif.filter(i => i.status === 0).map(i => i.id)
		if (unread.length) {
			dispatch(readNotif(unread, id))
		}
	}

	const readOne = (notifid) => {
		const unread = [notifid]
		dispatch(readNotif(unread, id))
	}

	const fetchMoreItems = () => {
		if (items.length >= notif.length) {
			hasMore.current = false
		}
		setItems(items.concat(notif.slice(items.length, items.length + 50)))
	}

	useEffect(() => {
		if (notif) {
			const initial = notif.slice(0, 50)
			if (initial.length >= notif.length) {
				hasMore.current = false
			}
			setItems(initial)
		}
	}, [notif])

	return (
		<div className='max-w-screen-sm mx-auto px-2 slideDown'>
			<div className='flex flex-col justify-center bg-white rounded ui-shadow' style={{ height: 'calc(100vh - (80px + 64px))', maxHeight: '800px' }}>
				<h1 className='text-2xl sm:text-3xl text-center p-2 sm:p-4'>
					Notifications
				</h1>
				{/* {items.length
					? <>
						<div className="" style={fieldStyle}>
							{items.map(i => <Notification key={i.id} notif={i} readOne={readOne} />)}
						</div>
					</>
					: <div className="flex justify-center items-center p-4" style={fieldStyle}>
						You have no notifications
					</div>
				} */}
				<div id='scrollContainer' style={{ height: '100%', overflow: 'auto' }}>
					<InfiniteScroll
						dataLength={items.length}
						next={fetchMoreItems}
						hasMore={hasMore.current}
						scrollableTarget='scrollContainer'
						loader={
							<div className="flex justify-center items-center p-4" style={fieldStyle}>
								Loading...
							</div>
						}
						endMessage={null}
					>
						{items.length
							? <div style={fieldStyle}>
								{items.map(i => <Notification key={i.id} notif={i} readOne={readOne} />)}
							</div>
							: <div className="flex justify-center items-center p-4" style={fieldStyle}>
								You have no notifications
							</div>
						}
					</InfiniteScroll>
				</div>
				<MarkAsRead readAll={readAll} />
			</div>
		</div>
	)
}

export default Notifications