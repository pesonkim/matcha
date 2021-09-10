import { Link } from 'react-router-dom'
import { HeartIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import loginService from '../../services/login'

const Header = () => {
	const { loggedIn } = useSelector(state => state.user)

	return (
		<header className="h-16 w-full flex justify-center fixed top-0 left-0 right-0 z-50 blur ui-shadow">
			<section className="w-full max-w-screen-lg flex justify-between items-center mx-4">
				<section className="flex items-center">
					<Link to='/'>
						<p className="text-2xl">matcha </p>
					</Link>
					<Link to='/browse'>
						<HeartIcon className=' h-6 w-6' />
					</Link>
				</section>
				{loggedIn
					? <section className="flex items-center">
						<Link to='/signup'>
							<p className="text-xl mx-2 hover:opacity-50">profile</p>
						</Link>
						<Link to='/login'>
							<p className="text-xl mx-2 hover:opacity-50" onClick={() => loginService.logout()}>logout</p>
						</Link>
					</section>
					: <section className="flex items-center">
						<Link to='/signup'>
							<p className="text-xl mx-2 hover:opacity-50">signup</p>
						</Link>
						<Link to='/login'>
							<p className="text-xl mx-2 hover:opacity-50">login</p>
						</Link>
					</section>
				}
			</section>
		</header>
	)
}

export default Header