import { useSelector, useDispatch } from 'react-redux'
import TopBar from './TopBar'
import Image from './Image'
import Info from './Info'
import Actions from './Actions'
import { useEffect, useState } from 'react'
import { getUserById } from '../../../reducers/publicReducer'

import Confirm from '../../ui/Confirm'
import Modal from '../../ui/Modal'

const PublicProfile = ({ id }) => {
	const dispatch = useDispatch()
	const { profile } = useSelector(state => state.public)
	const [modal, setModal] = useState(null)
	const [dialog, setDialog] = useState(null)

	useEffect(async () => {
		await dispatch(getUserById(id))
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}, [dispatch])

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

	if (!profile) {
		return (
			<p>Loading user profile...</p>
		)
	} else {
		return (
			<div className='max-w-screen-sm mx-auto px-2 '>
				<div className='flex flex-col justify-center my-4 bg-white rounded ui-shadow'>
					<TopBar
						firstname={profile.firstname}
						age={profile.age}
						online={profile.online}
					/>
					<Image
						image={profile.avatar}
					/>
					<Info
						name={profile.firstname + ' ' + profile.lastname}
						age={profile.age}
						fame={profile.fame}
						lat={profile.latitude}
						lng={profile.longitude}
						gender={profile.gender}
						orientation={profile.orientation}
						bio={profile.bio}
						tags={profile.tags}
						online={profile.online}
						login={profile.last_login}
					/>
					<Actions
						user={profile.firstname}
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
}

export default PublicProfile
