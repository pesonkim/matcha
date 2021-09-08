import { Link } from 'react-router-dom'
import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import InputField from '../ui/forms/InputField'
import SubmitButton from '../ui/forms/SubmitButton'

const LoginPage = () => {
	return (
		<>
			<Wrapper>
				<Heading title='Login'/>
				<InputField type='text' name='Username'/>
				<InputField type='password' name='Password'/>
				<SubmitButton text='Login'/>
				<div className='text-center'>
					<Link to='/home' style={{ color: '#3490dc' }} >
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