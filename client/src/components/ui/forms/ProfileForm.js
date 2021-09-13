import Wrapper from '../Wrapper'
import Heading from './Heading'
import SubmitButton from './SubmitButton'
import UserImage from './UserImage'
import UserGender from './UserGender'
import UserOrientation from './UserOrientation'
import UserBio from './UserBio'
import UserTags from './UserTags'
import { useSelector, useDispatch } from 'react-redux'

const ProfileForm = () => {
	const { orientation, gender, bio, tags } = useSelector(state => state.user)

	const handleSubmit = (event) => {
		event.preventDefault()
		const data = {
			gender: gender,
			orientation: orientation,
			bio: bio,
			tags: tags,
		}

		console.log(data)

	}

	return (
		<Wrapper>
			<Heading title='Your profile' />
			<form onSubmit={handleSubmit}>
				<p className='mb-4 text-center'>Finish setting up your profile to start matching</p>

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