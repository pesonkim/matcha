import { useSelector, useDispatch } from 'react-redux'
import Wrapper from '../../ui/Wrapper'
import TopBar from './TopBar'
import Image from './Image'
import Info from './Info'
import Actions from './Actions'
import { useEffect, useState } from 'react'
import { profileLike, profileReport, profileBlock } from '../../../reducers/matchReducer'

import Confirm from '../../ui/Confirm'
import MatchModal from '../../ui/MatchModal'

const PublicProfile = ({ profile }) => {
	const dispatch = useDispatch()
	const { id } = useSelector(state => state.user)
	const [modal, setModal] = useState(null)
	const [dialog, setDialog] = useState(null)

	useEffect(() => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}, [])

	const handleLike = async ({ type, likeid }) => {
		await dispatch(profileLike({ from: id, to: profile.id, type: type, id: likeid }))
		if (type === 'remove') {
			setModal(null)
		}
	}

	const handleReport = async () => {
		await dispatch(profileReport({ from: id, to: profile.id }))
		setDialog(null)
	}

	const handleBlock = async () => {
		await dispatch(profileBlock({ from: id, to: profile.id, type: 'new' }))
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
			<div className='max-w-screen-sm mx-auto px-2 slideDown'>
				<div className='flex flex-col justify-center bg-white rounded ui-shadow'>
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
						user={profile}
						handleLike={handleLike}
						askConfirm={setDialog}
						setModal={setModal}
						handleReport={handleReport}
						handleBlock={handleBlock}
					/>
					<Confirm dialog={dialog} setDialog={setDialog} />
					<MatchModal modal={modal} setModal={setModal}/>
				</div>
			</div>
		)
	}
}

export default PublicProfile
