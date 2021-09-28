import { useSelector, useDispatch } from 'react-redux'
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api'
import { update } from '../../../reducers/userReducer'
import parse from '../../../utils/parse'

const UserLocation = () => {
	const { latitude, longitude } = useSelector(state => state.user)
	const { id, orientation, gender, bio, tags } = useSelector(state => state.user)
	const { users } = useSelector(state => state.public)
	const dispatch = useDispatch()

	const style = {
		width: '100%',
		height: '100vw',
		maxWidth: '500px',
		maxHeight: '500px',
		margin: 'auto',
	}

	const center = {
		lat: latitude,
		lng: longitude
	}

	const options = {
		center: center,
		zoom: 7,
		streetViewControl: false,
		disableDefaultUI: true,
		zoomControl: true,
	}

	const handleDrag = (event) => {
		const latitude = event.latLng.lat()
		const longitude = event.latLng.lng()

		const data = {
			latitude,
			longitude,
			gender: gender,
			orientation: parse.oToDb(orientation),
			tags: (tags ? tags.map(t => t).join('') : ''),
			bio: bio,
		}

		//console.log(data)
		dispatch(update(data, id))
	}

	return (
		<LoadScript
			googleMapsApiKey={process.env.REACT_APP_API_KEY}
		>
			<GoogleMap
				mapContainerStyle={style}
				options={options}
			>
				<Marker
					position={center}
					draggable={true}
					onDragEnd={(e) => handleDrag(e)}
				/>
				{users
					? users.length
						? users.map(user => {
							return <Circle
								key={user.id}
								center={{ lat: user.latitude, lng: user.longitude }}
								radius={10000}
								options={{
									strokeColor: '#FF0000',
									strokeOpacity: 0.5,
									strokeWeight: 2,
									fillColor: '#FF0000',
									fillOpacity: 0.35,
								}}
							/>
						})
						: null
					: null
				}

			</GoogleMap>
		</LoadScript>
	)
}

export default UserLocation