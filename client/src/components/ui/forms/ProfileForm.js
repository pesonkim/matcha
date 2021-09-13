import Wrapper from '../Wrapper'
import Heading from './Heading'
import SubmitButton from './SubmitButton'
import UserImage from './UserImage'
import UserGender from './UserGender'
import UserOrientation from './UserOrientation'
import UserBio from './UserBio'
import UserTags from './UserTags'
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../../../reducers/userReducer'
import parse from '../../../utils/parse'

const ProfileForm = () => {
	const { orientation, gender, bio, tags, id } = useSelector(state => state.user)
	const { errorMessage, notification } = useSelector(state => state.message)
	const dispatch = useDispatch()

	const handleSubmit = (event) => {
		event.preventDefault()

		const data = {
			gender: gender,
			orientation: parse.parseOrientation(orientation),
			tags: (tags ? tags.map(t => t).join('') : ''),
			bio: bio,
		}

		//console.log(data)
		dispatch(update(data, id))
	}

	return (
		<Wrapper>
			<Heading title='Your profile' />
			{notification && <div className='mb-4 text-center text-green-500'>{notification}</div>}
			<form onSubmit={handleSubmit}>
				<p className='mb-4 text-center'>Finish setting up your profile to start matching</p>
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

export default ProfileForm

//avatar
//gender
//orientation
//bio
//tags

//redux magix to get states
//image upload form
//tag creation