import { Link } from 'react-router-dom'
import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import InputField from '../ui/forms/InputField'
import SubmitButton from '../ui/forms/SubmitButton'

const LoginPage = () => {
	return (
		<>
			<Wrapper>
				<Heading title='Forgot your password?' />
				<p>Please enter the <b>email address</b> associated with your account to receive a link to reset your password.</p>
				<InputField type='text' name='' />
				<SubmitButton text='Send password reset email' />
				<div className='text-center'>
					<Link to='/login' style={{ color: '#3490dc' }} >
						Back to login
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