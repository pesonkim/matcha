import { useSelector, useDispatch } from 'react-redux'
import TopBar from './TopBar'
import Image from './Image'
import Info from './Info'
import Actions from './Actions'
import { useEffect, useState } from 'react'

import Confirm from '../../ui/Confirm'
import Modal from '../../ui/Modal'

const PublicProfile = ({ user }) => {
	const [modal, setModal] = useState(null)
	const [dialog, setDialog] = useState(null)

	useEffect(() => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}, [])

	const handleLike = () => {
		console.log('like')
	}

	const handleReport = () => {
		setDialog(null)
		console.log('report')
	}

	const handleBlock = () => {
		setDialog(null)
		console.log('block')
	}

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
					user={user.firstname}
					handleLike={handleLike}
					askConfirm={setDialog}
					handleReport={handleReport}
					handleBlock={handleBlock}
				/>
				<Confirm dialog={dialog} setDialog={setDialog} />
			</div>
		</div>
	)
}

export default PublicProfile
