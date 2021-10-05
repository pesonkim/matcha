import { Link } from 'react-router-dom'
import { HeartIcon, LogoutIcon, LoginIcon } from '@heroicons/react/outline'
import { UserCircleIcon, ChatIcon, UserAddIcon, BellIcon } from '@heroicons/react/solid'
import { useSelector } from 'react-redux'
import loginService from '../../services/login'
import { useEffect, useState } from 'react'

const Header = () => {
	const { loggedIn, id } = useSelector(state => state.user)
	const { matches, notif, likes } = useSelector(state => state.match)
	const [unreadMessages, setUnreadMessages] = useState(null)
	const [unreadNotif, setUnreadNotif] = useState(null)

	useEffect(() => {
		if (matches && likes) {
			let count = 0
			matches.map(i => {
				const like = likes.find(l => l.receiver === i.id)
				if (i.chat.length) {
					const len = i.chat.filter(message => message.receiver === id && message.status === 0)
					if (len && len.length) {
						count += len.length
					} else if (like && like.is_seen === 0) {
						count++
					}
				} else if (like && like.is_seen === 0) {
					count++
				}
			})
			if (count) {
				count < 99 ? setUnreadMessages(count) : setUnreadMessages(99)
			} else {
				setUnreadMessages(null)
			}
		}
	}, [matches, likes])

	useEffect(() => {
		if (notif) {
			let count = 0
			notif.map(i => i.status === 0 ? count++ : null)
			if (count) {
				count < 99 ? setUnreadNotif(count) : setUnreadNotif(99)
			} else {
				setUnreadNotif(null)
			}
		}
	}, [notif])

	const blur = {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		backdropFilter: 'blur(5px)',
	}

	const divStyle = {
		height: '32px',
		width: '32px',
		padding: '1px',
	}

	const imgStyle = {
		height: '100%',
		width: '100%',
		borderRadius: '50%',
		objectFit: 'cover',
		borderWidth: '1px',
		borderColor: '#dae4e9',
	}

	return (
		<header className="h-16 w-full flex justify-center fixed top-0 left-0 right-0 z-50 ui-shadow" style={blur}>
			<section className="w-full max-w-screen-lg flex justify-between items-center mx-4">
				<section className="flex items-center">
					<Link to='/' className='flex items-center hover:opacity-50 select-none'>
						<p className="text-2xl">matcha </p>
						<HeartIcon className=' h-6 w-6' />
					</Link>
				</section>
				{loggedIn
					? <section className="flex items-center">
						<Link to='/notif' className='flex flex-col items-center mx-2 xs:mx-4 hover:opacity-50 select-none relative'>
							<BellIcon className=' h-8 w-8' />
							<p className='hidden sm:block'>notifications</p>
							{unreadNotif &&
								<div
									className='absolute w-6 h-6 top-1/2 sm:top-1/3 left-full sm:left-2/3 transform -translate-x-1/2 -translate-y-1/2 rounded-full inline-block text-white bg-red-500 text-center'
									style={{ lineHeight: '1.5rem' }}
								>
									<span className='z-10 relative'>
										{unreadNotif}
									</span>
									<span className='z-0 absolute bg-red-500 animate-ping w-6 h-6 top-0 left-0 rounded-full'></span>
								</div>
							}
						</Link>
						<Link to='/matches' className='flex flex-col items-center mx-2 xs:mx-4 hover:opacity-50 select-none relative'>
							<ChatIcon className=' h-8 w-8' />
							<p className='hidden sm:block'>matches</p>
							{unreadMessages &&
								<div
									className='absolute w-6 h-6 top-1/2 sm:top-1/3 left-full sm:left-2/3 sm:ml-2 transform -translate-x-1/2 -translate-y-1/2 rounded-full inline-block text-white bg-red-500 text-center'
									style={{ lineHeight: '1.5rem' }}
								>
									<span className='z-10 relative'>
										{unreadMessages}
									</span>
									<span className='z-0 absolute bg-red-500 animate-ping w-6 h-6 top-0 left-0 rounded-full'></span>
								</div>
							}
						</Link>
						<Link to='/profile' className='flex flex-col items-center mx-2 xs:mx-4 hover:opacity-50 select-none'>
							<UserCircleIcon className=' h-8 w-8' />
							<p className='hidden sm:block'>profile</p>
						</Link>
						<section className='flex flex-col items-center ml-2 xs:ml-4 hover:opacity-50 cursor-pointer select-none' onClick={() => loginService.logout()} >
							<LogoutIcon className=' h-8 w-8' />
							<p className='hidden sm:block'>logout</p>
						</section>
					</section>
					: <section className="flex items-center">
						<Link to='/signup' className='flex flex-col items-center mx-2 xs:mx-4 hover:opacity-50'>
							<UserAddIcon className=' h-8 w-8 mx-2' />
							<p className="">signup</p>
						</Link>
						<Link to='/login' className='flex flex-col items-center ml-2 xs:ml-4 hover:opacity-50'>
							<LoginIcon className=' h-8 w-8 mx-2' />
							<p className="">login</p>
						</Link>
					</section>
				}
			</section>
		</header>
	)
}

export default Header