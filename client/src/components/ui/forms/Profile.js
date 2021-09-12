import Wrapper from '../Wrapper'
import Heading from './Heading'
import SubmitButton from './SubmitButton'
import UserImage from './UserImage'
import UserGender from './UserGender'
import UserOrientation from './UserOrientation'
import UserBio from './UserBio'
import UserTags from './UserTags'

const ProfileForm = () => {


	const handleSubmit = (event) => {
		event.preventDefault()
		const data = {
			gender: event.target.gender.value,
			orientation: event.target.orientation.value,
			bio: event.target.bio.value,
			tags: event.target.tags.value,
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