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
import { getLog, profileBlock } from '../../reducers/matchReducer'
import parse from '../../utils/parse'
import Togglable from '../ui/Togglable'
import { useEffect } from 'react'
import { setError, clear, populate, avatar } from '../../reducers/formReducer'
import PasswordField from '../ui/forms/PasswordField'
import validate from '../../utils/validate'
import UserLocation from '../ui/forms/UserLocation'
import TimeAgo from 'react-timeago'
import { Link } from 'react-router-dom'
import imageCompression from 'browser-image-compression'

const ProfilePage = () => {
	const { id } = useSelector(state => state.user)
	const { firstname, lastname, username, email, orientation, gender, bio, tags, errorMessage, notification } = useSelector(state => state.form)
	const { blocks, log, views, likes, reports } = useSelector(state => state.match)
	const dispatch = useDispatch()

	useEffect(async () => {
		await dispatch(populate(id))
		await dispatch(getLog(views, likes, reports))
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

		// console.log(data)
		await dispatch(update(data, id))
		await dispatch(updateTags(tags))

		if (data.firstname) {
			event.target.firstname.value = ''
			event.target.firstname.placeholder = data.firstname
		}
		if (data.lastname) {
			event.target.lastname.value = ''
			event.target.lastname.placeholder = data.lastname
		}
		if (data.username && !errorMessage) {
			event.target.username.value = ''
			event.target.username.placeholder = data.username
		}
		if (data.email && !errorMessage) {
			event.target.email.value = ''
			event.target.email.placeholder = data.email
		}

		const imageFile = event.target.photo.files[0]
		const reader = new FileReader()

		const options = {
			maxSizeMB: 0.5,
			maxWidthOrHeight: 1920,
			useWebWorker: true
		}

		if (imageFile && imageFile.size <= 1000000) {
			try {
				const compressedFile = await imageCompression(imageFile, options)
				reader.readAsDataURL(compressedFile)
				reader.onloadend = async () => {
					dispatch(avatar({ blob: reader.result }))
				}
			} catch (error) {
				event.target.photo.value = null
			}
		}
	}

	const handleUnblock = async (event) => {
		event.preventDefault()
		await dispatch(profileBlock({ id: event.target.id, type: 'remove' }))
		dispatch({
			type: 'NOTIF',
			data: 'Profile updated'
		})
	}

	const inputStyle = {
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		padding: '.75rem',
		width: '100%',
		height: '38px'
	}

	const logStyle = {
		maxHeight: '50vh',
		overflow: 'auto',
	}

	const entryStyle = {
		display: 'block',
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		width: '100%',
		padding: '.5rem',
	}

	return (
		<Wrapper>
			<Heading title='Your profile' />
			{notification && <div className='mb-4 text-center text-green-500'>{notification}</div>}
			{errorMessage && <div className='mb-4 text-center text-red-500'>{errorMessage}</div>}
			<form onSubmit={handleSubmit}>
				<Togglable text='Profile picture'>
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

				</Togglable>
				<hr className='my-4' />

				<Togglable text='Site preferences'>
					<UserGender />

					<UserOrientation />

					<UserTags />

					<UserBio />
				</Togglable>
				<hr className='my-4' />

				<Togglable text='Location'>
					<UserLocation />
				</Togglable>
				<hr className='my-4' />

				<Togglable text='Activity log'>
					<div style={logStyle}>
						{log.length
							? (log.map((v, i) => {
								return (
									<div key={i + v.date} className='' style={entryStyle}>
										<span>{v.type} </span>
										<Link to={`/browse/${v.target.id}`}>
											<span style={{ color: '#3490dc' }}>{v.target.firstname} </span>
										</Link>
										<span><TimeAgo date={v.date} live={false} /></span>
									</div>
								)
							}))
							: <div style={entryStyle}>
								<span>You have no activity</span>
							</div>
						}
					</div>
				</Togglable>
				<hr className='my-4' />

				<Togglable text='Blocked users'>
					<div style={logStyle} className='mb-4'>
						{blocks.length
							? (blocks.map((v) => {
								return (
									<div key={v.id} className='flex justify-between ' style={entryStyle}>
										<span>{v.firstname}</span>
										<button
											id={v.id}
											className='rounded bg-green-500 hover:bg-green-600 text-white ml-2 p-1'
											onClick={handleUnblock}
										>
											Unblock
										</button>
									</div>
								)
							}))
							: <div style={entryStyle}>
								<span>You have no blocked users</span>
							</div>
						}
					</div>
				</Togglable>
				<SubmitButton text='Save changes' />
			</form>
		</Wrapper>
	)
}

export default ProfilePage
