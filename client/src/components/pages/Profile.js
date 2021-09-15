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
import { updateTags } from '../../reducers/publicReducer'
import parse from '../../utils/parse'
import Togglable from '../ui/Togglable'
import { useEffect } from 'react'
import { setError, clear, populate } from '../../reducers/formReducer'
import PasswordField from '../ui/forms/PasswordField'
import validate from '../../utils/validate'
import UserLocation from '../ui/forms/UserLocation'


const ProfilePage = () => {
	const { id } = useSelector(state => state.user)
	const { firstname, lastname, username, email, orientation, gender, bio, tags, errorMessage, notification } = useSelector(state => state.form)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(populate(id))
	}, [])


	const handleSubmit = async (event) => {
		event.preventDefault()
		dispatch(clear())

		const firstname = event.target.firstname.value
		const lastname = event.target.lastname.value
		const username = event.target.username.value
		const email = event.target.email.value
		const password = event.target.password.value

		if (email) {
			const check = validate({ email: email })
			if (check.email) {
				return dispatch(setError(check.email))
			}
		}
		if (password) {
			const check = validate({ password: password })
			if (check.password) {
				return dispatch(setError(check.password))
			}
		}

		let data = {
			firstname: firstname,
			lastname: lastname,
			username: username,
			email: email,
			password: password,
			gender: gender,
			orientation: parse.oToDb(orientation),
			tags: (tags ? tags.map(t => t).join('') : ''),
			bio: bio,
		}

		for (var propName in data) {
			if (data[propName] === null || data[propName] === '') {
				delete data[propName]
			}
		}

		console.log(data)
		await dispatch(update(data, id))
		await dispatch(updateTags(tags))
	}

	const inputStyle = {
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		padding: '.75rem',
		width: '100%',
		height: '38px'
	}

	return (
		<Wrapper>
			<Heading title='Your profile' />
			{notification && <div className='mb-4 text-center text-green-500'>{notification}</div>}
			{errorMessage && <div className='mb-4 text-center text-red-500'>{errorMessage}</div>}
			<form onSubmit={handleSubmit}>
				<Togglable text='Photos'>
					<UserImage />
				</Togglable>
				<hr className='my-4' />

				<Togglable text='User details'>
					<div className='flex mb-4'>
						<div className='inline-block mr-2 w-1/2'>
							<label>First name</label>
							<input name='firstname' type='text' style={inputStyle} placeholder={firstname} />
						</div>
						<div className='inline-block ml-2 w-1/2'>
							<label>Last name</label>
							<input name='lastname' type='text' style={inputStyle} placeholder={lastname} />
						</div>
					</div>
					<label>Username</label>
					<input name='username' type='text' style={inputStyle} placeholder={username} className='mb-4' />

					<label>Email</label>
					<input name='email' type='text' style={inputStyle} placeholder={email} className='mb-4' />

					<label>Password</label>
					<PasswordField />

					<SubmitButton text='Save changes' />
				</Togglable>
				<hr className='my-4' />

				<Togglable text='Site preferences'>
					<UserGender />

					<UserOrientation />

					<UserTags />

					<UserBio />

					<SubmitButton text='Save changes' />
				</Togglable>
				<hr className='my-4' />

				<Togglable text='Location'>
					<UserLocation />
				</Togglable>
				<hr className='my-4' />

				<Togglable text='History'>
					View history would go here
				</Togglable>
				<hr className='my-4' />

				<Togglable text='Blocked users'>
					Blocklist would go here
				</Togglable>
			</form>
		</Wrapper>
	)
}

export default ProfilePage
