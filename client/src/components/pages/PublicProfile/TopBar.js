import { Link } from 'react-router-dom'
import { XIcon } from '@heroicons/react/outline'
import { UserIcon, FireIcon } from '@heroicons/react/solid'

const TopBar = ({ room }) => {
	const style = {
		height: '60px',
	}

	return (
		<div className="w-full flex items-center justify-between p-4" style={style}>
			{/* <section className="flex items-center">
				<UserIcon className=' h-6 w-6' />
				<p>Username</p>
			</section>
			<section className="flex items-center">
				<FireIcon className=' h-6 w-6' />
				<p>100</p>
			</section> */}
			<section className="flex items-center">
				<span className=' text-2xl'>Name</span>
				,
				<span className='ml-2 text-2xl'>31</span>
			</section>
			<section className="flex items-center">
				<Link to='/browse' className='flex items-center hover:opacity-50'>
					<span>Back to browse</span>
					<XIcon className='ml-2 h-8 w-8' />
				</Link>
			</section>
		</div>
	)
}

export default TopBar