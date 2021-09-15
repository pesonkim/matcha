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
import { updateTags } from '../../../reducers/publicReducer'
import parse from '../../../utils/parse'

const ProfileForm = () => {
	const { id } = useSelector(state => state.user)
	const { orientation, gender, bio, tags, errorMessage, notification } = useSelector(state => state.form)
	const dispatch = useDispatch()

	const handleSubmit = async (event) => {
		event.preventDefault()

		const data = {
			gender: gender,
			orientation: parse.oToDb(orientation),
			tags: (tags ? tags.map(t => t).join('') : ''),
			bio: bio,
		}

		//console.log(data)
		await dispatch(update(data, id))
		await dispatch(updateTags(tags))
	}

	return (
		<Wrapper>
			<Heading title='Your profile' />
			{notification && <div className='mb-4 text-center text-green-500'>{notification}</div>}
			<form onSubmit={handleSubmit}>
				<p className='mb-4 text-center'>Finish setting up your profile to start matching</p>
				{errorMessage && <div className='mb-4 text-center text-red-500'>{errorMessage}</div>}

				<UserImage />
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