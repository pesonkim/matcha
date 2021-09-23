import TimeAgo from 'react-timeago'
import { FireIcon, LocationMarkerIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import { getDistance, convertDistance } from 'geolib'

const Info = ({ name, fame, age, lat, lng, gender, orientation, bio, tags, online, login }) => {
	const { latitude, longitude } = useSelector(state => state.user)

	const fieldStyle = {
		borderBottomWidth: '1px',
		borderColor: '#dae4e9',
	}

	const distance = () => {
		const meters = getDistance(
			{ latitude: lat, longitude: lng },
			{ latitude: latitude, longitude: longitude }
		)
		const km = Math.ceil(convertDistance(meters, 'km'))

		return (
			<span className='text-lg text-gray-600'>{`
			${km} km away
			`}</span>
		)
	}

	return (
		<>
			<div className="w-full flex flex-col p-4" style={fieldStyle}>
				<section className="flex justify-between items-center">
					<strong className='text-xl'>{name}</strong>
					<strong className='text-xl'>{age}</strong>
				</section>
				<section className="flex justify-between items-center mt-2 mb-4">
					<section className="flex">
						<LocationMarkerIcon className='h-6 w-6 mr-1' />
						{distance()}
					</section>
					<section className="flex ">
						<FireIcon className='h-6 w-6 mr-1' />
						<span className='text-lg text-gray-600'>{fame}</span>
					</section>
				</section>
				<p className=''>{bio}</p>
			</div>
			<div className="w-full flex items-center p-4" style={fieldStyle}>
				<p>{gender} looking for {orientation.join(', ')}</p>
			</div>
			<div className="w-full flex items-center p-4" style={fieldStyle}>
				<p>{tags.join(' ')}</p>
			</div>
			<div className="w-full flex items-center p-4" style={fieldStyle}>
				{online
					? <p>online</p>
					: <p>last online <TimeAgo date={login} live={false} /></p>
				}
			</div>
		</>
	)
}

export default Info