import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import InputField from '../ui/forms/InputField'
import PasswordField from '../ui/forms/PasswordField'
import SubmitButton from '../ui/forms/SubmitButton'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../reducers/userReducer'
import { setNotif, clear } from '../../reducers/formReducer'

const LoginPage = () => {
	const { latitude } = useSelector(state => state.user)
	const { longitude } = useSelector(state => state.user)
	const { errorMessage } = useSelector(state => state.form)
	const { notification } = useSelector(state => state.form)
	const dispatch = useDispatch()

	useEffect(() => {
		if (window.location.pathname === '/verify') {
			dispatch(setNotif('Account verified. You can now access Matcha'))
		} else {
			dispatch(clear())
		}
	},[])

	const handleSubmit = (event) => {
		event.preventDefault()
		const data = {
			username: event.target.username.value,
			password: event.target.password.value,
			latitude: latitude,
			longitude: longitude
		}
		//console.log(data)
		dispatch(login(data))
	}

	return (
		<>
			<Wrapper>
				<Heading title='Login' />
				{notification && <div className='mb-4 text-center text-green-500'>{notification}</div>}
				{errorMessage && <div className='mb-4 text-center text-red-500'>{errorMessage}</div>}
				<form onSubmit={handleSubmit}>
					<InputField type='text' name='username' />
					<label>Password</label>
					<PasswordField />
					<SubmitButton text='Login' />
				</form>
				<div className='text-center'>
					<Link to='/forgot' style={{ color: '#3490dc' }} >
						Forgot password?
					</Link>
				</div>
			</Wrapper>
			<Wrapper>
				<div className='text-center'>
					Don&apos;t have an account?
					<Link to='/signup' style={{ color: '#3490dc' }} >
						&nbsp;Signup
					</Link>
				</div>
			</Wrapper>
		</>
	)
}

export default LoginPage