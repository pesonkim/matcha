import { useSelector, useDispatch } from 'react-redux'
import Wrapper from '../../ui/Wrapper'
import TopBar from './TopBar'
import Image from './Image'
import Info from './Info'
import Actions from './Actions'
import { useEffect, useState } from 'react'
import { getUserById } from '../../../reducers/publicReducer'
import { profileView, profileLike, profileReport, profileBlock } from '../../../reducers/matchReducer'

import Confirm from '../../ui/Confirm'
import Modal from '../../ui/Modal'

const PublicProfile = ({ profileId }) => {
	const dispatch = useDispatch()
	const { profile } = useSelector(state => state.public)
	const { id } = useSelector(state => state.user)
	const [modal, setModal] = useState(null)
	const [dialog, setDialog] = useState(null)

	useEffect(async () => {
		await dispatch(getUserById(profileId))
		await dispatch(profileView({ from: id, to: profileId }))
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}, [dispatch])

	const handleLike = async () => {
		await dispatch(profileLike({ from: id, to: profileId }))
	}

	const handleReport = async () => {
		await dispatch(profileReport({ from: id, to: profileId }))
		setDialog(null)
	}

	const handleBlock = async () => {
		await dispatch(profileBlock({ from: id, to: profileId }))
		setDialog(null)
	}

	if (!profile) {
		return (
			<Wrapper>
				<div className='text-center'>
					Loading user profile...
				</div>
			</Wrapper>
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
