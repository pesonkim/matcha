import { Link } from 'react-router-dom'
import { HeartIcon, LogoutIcon, LoginIcon } from '@heroicons/react/outline'
import { UserCircleIcon, ChatIcon, BellIcon, UserAddIcon } from '@heroicons/react/solid'
import { useSelector } from 'react-redux'
import loginService from '../../services/login'

const Header = () => {
	const { loggedIn } = useSelector(state => state.user)

	const blur = {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		backdropFilter: 'blur(5px)',
	}

	return (
		<header className="h-16 w-full flex justify-center fixed top-0 left-0 right-0 z-50 ui-shadow" style={blur}>
			<section className="w-full max-w-screen-lg flex justify-between items-center mx-4">
				<section className="flex items-center">
					<Link to='/' className='flex items-center hover:opacity-50'>
						<p className="text-2xl">matcha </p>
						<HeartIcon className=' h-6 w-6' />
					</Link>
				</section>
				{loggedIn
					? <section className="flex items-center">
						<Link to='/notif' className='flex flex-col items-center mx-2 xs:mx-4 hover:opacity-50'>
							<BellIcon className=' h-8 w-8' />
							<p className='hidden sm:block'>notifications</p>
						</Link>
						<Link to='/join' className='flex flex-col items-center mx-2 xs:mx-4 hover:opacity-50'>
							<ChatIcon className=' h-8 w-8' />
							<p className='hidden sm:block'>matches</p>
						</Link>
						<Link to='/profile' className='flex flex-col items-center mx-2 xs:mx-4 hover:opacity-50'>
							<UserCircleIcon className=' h-8 w-8' />
							<p className='hidden sm:block'>profile</p>
						</Link>
						<Link to='/' className='flex flex-col items-center ml-2 xs:ml-4 hover:opacity-50' onClick={() => loginService.logout()} >
							<LogoutIcon className=' h-8 w-8' />
							<p className='hidden sm:block'>logout</p>
						</Link>
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