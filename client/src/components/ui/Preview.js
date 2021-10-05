import { FireIcon, LocationMarkerIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import { getDistance, convertDistance } from 'geolib'
import { HeartIcon as MatchIcon } from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline'

const Preview = ({ user }) => {
	const { latitude, longitude } = useSelector(state => state.user)
	const { publicLikes, matches, likes } = useSelector(state => state.match)

	const hasLiked = publicLikes.find(i => i.sender === user.id)
	const isLiked = likes.find(i => i.receiver === user.id)
	const isMatch = matches.find(i => i.id === user.id)

	const imgDivStyle = {
		height: '200px',
		maxHeight: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		overflow: 'hidden',
		backgroundColor: 'rgba(248,247,251,255)',
		position: 'relative'
	}

	const imgStyle = {
		objectFit: 'contain',
		height: 'auto',
		width: '100%',
		maxHeight: '100%',
		maxWidth: '100%',
		margin: 'auto',
	}

	const distance = () => {
		const lat = user.latitude
		const lng = user.longitude
		const meters = getDistance(
			{ latitude: lat, longitude: lng },
			{ latitude: latitude, longitude: longitude }
		)
		const km = Math.ceil(convertDistance(meters, 'km'))

		return (
			<span className='text-gray-600'>{`
			${km} km away
			`}</span>
		)
	}

	return (
		<div className='flex flex-col  justify-center p-4 bg-white rounded ui-shadow slideDown'>
			<section className="flex items-center mb-2">
				{user.online
					? <span className='text-green-500'>●&nbsp;</span>
					: <span className='text-red-500'>●&nbsp;</span>
				}
				<span className='truncate text-xl'>{user.firstname}</span>
				,
				<span className='ml-2 text-xl'>{user.age}</span>
			</section>
			<div style={imgDivStyle} >
				<img src={user.avatar ? user.avatar : 'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'} alt='avatar' style={imgStyle} />
				<div className='absolute bottom-2 right-2 bg-white rounded-full shadow '>
					{isMatch
						? (<div className='flex flex-row items-center p-1'>
							<MatchIcon className='h-6 w-6 text-pink-500' />
							<span>match</span>
						</div>)
						: isLiked
							? (<div className='flex flex-row items-center p-1'>
								<HeartIcon className='h-6 w-6 text-pink-500' />
								<span>liked</span>
							</div>)
							: hasLiked
								? (<div className='flex flex-row items-center p-1'>
									<HeartIcon className='h-6 w-6 text-pink-500' />
									<span>likes you</span>
								</div>)
								: null
					}
				</div>
			</div>
			<section className="flex justify-between items-center mt-2 mb-2">
				<section className="flex">
					<LocationMarkerIcon className=' h-5 w-5 mr-1' />
					{distance()}
				</section>
				<section className="flex ">
					<FireIcon className=' h-5 w-5 mr-1' />
					<span className=' text-gray-600'>{user.fame}</span>
				</section>
			</section>
			<span className="text-sm mb-2">{user.gender} looking for {user.orientation.join(', ')}</span>
			<span className="text-sm">{user.tags.join(' ')}</span>
		</div>
	)
}

export default Preview