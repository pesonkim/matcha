import { useSelector, useDispatch } from 'react-redux'
import TopBar from './TopBar'
import Image from './Image'
import Info from './Info'
import Actions from './Actions'
import { useEffect } from 'react'

const PublicProfile = ({ user }) => {
	useEffect(() => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}, [])
	return (
		<div className='max-w-screen-sm mx-auto px-2 '>
			<div className='flex flex-col justify-center my-4 bg-white rounded ui-shadow'>
				<TopBar
					firstname={user.firstname}
					age={user.age}
					online={user.online}
				/>
				<Image
					image={user.avatar}
				/>
				<Info
					name={user.firstname + ' ' + user.lastname}
					age={user.age}
					fame={user.fame}
					lat={user.latitude}
					lng={user.longitude}
					gender={user.gender}
					orientation={user.orientation}
					bio={user.bio}
					tags={user.tags}
					online={user.online}
					login={user.last_login}
				/>
				<Actions
				/>
			</div>
		</div>
	)
}

export default PublicProfile
