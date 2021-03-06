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
import MatchModal from '../../ui/MatchModal'

const PublicProfile = ({ profileId }) => {
	const dispatch = useDispatch()
	const { profile } = useSelector(state => state.public)
	const { id } = useSelector(state => state.user)
	const { publicLikes, matches, likes } = useSelector(state => state.match)
	const [modal, setModal] = useState(null)
	const [dialog, setDialog] = useState(null)
	const [wait, setWait] = useState(false)

	const hasLiked = publicLikes.find(i => i.sender === profileId)
	const isLiked = likes.find(i => i.receiver === profileId)
	const isMatch = matches.find(i => i.id === profileId)

	useEffect(async () => {
		await dispatch(profileView({ from: id, to: profileId }))
		await dispatch(getUserById(profileId))
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}, [dispatch])

	useEffect(() => {
		if (wait) {
			if (matches.find(match => match.id === profileId)) {
				setModal({ type: 'match', user: profile })
			}
			setWait(false)
		}
	}, [matches])

	const handleLike = async ({ type, likeid }) => {
		await dispatch(profileLike({ from: id, to: profileId, type: type, id: likeid }))
		if (type === 'remove') {
			setModal(null)
		}
		await dispatch(getUserById(profileId))
		if (type === 'new') {
			setWait(true)
		}
	}

	const handleReport = async () => {
		await dispatch(profileReport({ from: id, to: profileId }))
		setDialog(null)
		await dispatch(getUserById(profileId))
	}

	const handleBlock = async () => {
		await dispatch(profileBlock({ from: id, to: profileId, type: 'new' }))
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
						status={
							isMatch
								? 'match'
								:	isLiked
									? 'liked'
									: hasLiked
										? 'likes you'
										: null
						}
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
					<MatchModal modal={modal} setModal={setModal} />
				</div>
			</div>
		)
	}
}

export default PublicProfile
