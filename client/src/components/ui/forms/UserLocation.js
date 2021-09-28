import { useSelector, useDispatch } from 'react-redux'
import { GoogleMap, useJsApiLoader, Marker, Circle } from '@react-google-maps/api'
import { update } from '../../../reducers/userReducer'
import { getUsers } from '../../../reducers/publicReducer'
import { useCallback, useEffect, useState } from 'react'
import parse from '../../../utils/parse'

const UserLocation = () => {
	const { latitude, longitude } = useSelector(state => state.user)
	const { id, orientation, gender, bio, tags } = useSelector(state => state.user)
	const { ids, users, sortFilter, filterSliders } = useSelector(state => state.public)
	const { blocks } = useSelector(state => state.match)
	const dispatch = useDispatch()

	useEffect(async () => {
		if (ids) {
			await dispatch(getUsers([], { ...filterSliders, distance: 100000 }, sortFilter, tags, latitude, longitude, blocks))
		}
	}, [ids])

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_API_KEY,
	})
	const [map, setMap] = useState(null)

	const onLoad = useCallback((map) => {
		// console.log('mount')
		const extendedZoomAccuracy = 0.007
		const bounds = new window.google.maps.LatLngBounds()
		bounds.extend(center)

		if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
			const extendPoint = new window.google.maps.LatLng(
				bounds.getNorthEast().lat() + extendedZoomAccuracy,
				bounds.getNorthEast().lng() + extendedZoomAccuracy
			)
			bounds.extend(extendPoint)
		}

		map.fitBounds(bounds)
		setMap(map)
	})

	const onUnmount = useCallback((map) => {
		// console.log('unmount')
		setMap(null)
	})

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
		zoom: 6,
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

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={style}
			options={options}
			zoom={7}
			onLoad={onLoad}
			onUnmount={onUnmount}
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
	) : <></>
}

export default UserLocation