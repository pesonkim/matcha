import { FireIcon, LocationMarkerIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import { getDistance, convertDistance } from 'geolib'

const Preview = ({ user }) => {
	const { latitude, longitude } = useSelector(state => state.user)

	const imgDivStyle = {
		height: '200px',
		maxHeight: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		overflow: 'hidden',
		backgroundColor: 'rgba(248,247,251,255)',
	}

	const imgStyle = {
		objectFit: 'contain',
		height: 'auto',
		width: '100%',
		maxHeight: '100%',
		maxWidth: '100%',
		margin: 'auto',
	}

	const fieldStyle = {
		borderBottomWidth: '1px',
		borderColor: '#dae4e9',
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
		<div className='flex flex-col  justify-center p-4 bg-white rounded ui-shadow'>
			<section className="flex items-center mb-2">
				{user.online
					? <span className='text-green-500'>●&nbsp;</span>
					: <span className='text-red-500'>●&nbsp;</span>
				}
				<span className=' text-xl'>{user.firstname}</span>
				,
				<span className='ml-2 text-xl'>{user.age}</span>
			</section>
			<div style={imgDivStyle} >
				<img src={user.avatar ? user.avatar : 'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'} style={imgStyle} />
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