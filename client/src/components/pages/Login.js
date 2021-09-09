import { useState } from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import InputField from '../ui/forms/InputField'
import PasswordField from '../ui/forms/PasswordField'
import SubmitButton from '../ui/forms/SubmitButton'

const LoginPage = () => {
	const [errorMessage, setErrorMessage] = useState('')

	const handleSubmit = (event) => {
		event.preventDefault()
		const data = {
			username: event.target.username.value,
			password: event.target.password.value
		}
		if (!data.username) {
			setErrorMessage('Invalid username or password')
			setTimeout(() => {
				setErrorMessage('')
			}, 5000)
		}

		console.log(data)
	}

	return (
		<>
			<Wrapper>
				<Heading title='Login' />
				{errorMessage && <div className='mb-4 text-center text-red-500'>{errorMessage}</div>}
				<form onSubmit={handleSubmit}>
					<InputField type='text' name='username' />
					<PasswordField />
					<SubmitButton text='Login' />
				</form>
				<div className='text-center'>
					<Link to='/reset' style={{ color: '#3490dc' }} >
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