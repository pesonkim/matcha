import { Link } from 'react-router-dom'
import { XIcon } from '@heroicons/react/outline'
import { useHistory } from 'react-router-dom'

const InfoBar = ({ user }) => {
	let history = useHistory()

	const style = {
		borderBottomWidth: '2px',
		borderColor: '#dae4e9',
	}

	return (
		<div className="w-full flex justify-between items-center p-2 relative" style={style}>
			<section className='flex items-center overflow-hidden'>
				<Link to={`/matches/${user.id}`}>
					<div className='w-10 h-10 sm:w-12 sm:h-12 relative'>
						<img src={user.avatar} alt='avatar' className='h-full w-full rounded-full object-cover shadow' />
						<div className='absolute top-1/2 left-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full shadow '>
							{user.online
								? <div className='bg-green-500 h-4 w-4 rounded-full'></div>
								: <div className='bg-red-500 h-4 w-4 rounded-full'></div>
							}
						</div>
					</div>
				</Link>
				<span className='text-xl sm:text-2xl pl-4 '>{user.firstname}</span>
			</section>
			<section className='flex items-center cursor-pointer select-none hover:opacity-50 p-2' onClick={() => history.goBack()}>
				{/* <span className='sm:block hidden'>Back to matches</span> */}
				<XIcon className='ml-2 h-8 w-8' />
			</section>
		</div>
	)
}

export default InfoBar