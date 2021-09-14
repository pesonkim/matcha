import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import SubmitButton from '../ui/forms/SubmitButton'
import UserImage from '../ui/forms/UserImage'
import UserGender from '../ui/forms/UserGender'
import UserOrientation from '../ui/forms/UserOrientation'
import UserBio from '../ui/forms/UserBio'
import UserTags from '../ui/forms/UserTags'
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../../reducers/userReducer'
import parse from '../../utils/parse'
import Togglable from '../ui/Togglable'
import { useEffect } from 'react'
import { clear, populate } from '../../reducers/formReducer'

const ProfilePage = () => {
	const { id } = useSelector(state => state.user)
	const { orientation, gender, bio, tags, errorMessage, notification } = useSelector(state => state.form)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(populate(id))
	}, [])


	const handleSubmit = (event) => {
		event.preventDefault()

		const data = {
			gender: gender,
			orientation: parse.oToDb(orientation),
			tags: (tags ? tags.map(t => t).join('') : ''),
			bio: bio,
		}

		dispatch(update(data, id))
	}

	return (
		<Wrapper>
			<Heading title='Your profile' />
			{notification && <div className='mb-4 text-center text-green-500'>{notification}</div>}
			<form onSubmit={handleSubmit}>
				{errorMessage && <div className='mb-4 text-center text-red-500'>{errorMessage}</div>}

				{/* <UserImage /> */}
				<UserGender />
				<UserOrientation />

				<UserTags />
				<UserBio />
				<SubmitButton text='Save changes' />
			</form>
		</Wrapper>
	)
}

export default ProfilePage
