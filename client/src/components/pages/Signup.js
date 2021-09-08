import { Link } from 'react-router-dom'
import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import InputField from '../ui/forms/InputField'
import SubmitButton from '../ui/forms/SubmitButton'

const SignupPage = () => {
	return (
		<>
			<Wrapper>
				<Heading title='Signup'/>
				<InputField type='text' name='Username'/>
				<InputField type='text' name='Email'/>
				<SubmitButton text='Create account'/>
			</Wrapper>
			<Wrapper>
				<div className='text-center'>
					Have an account?
					<Link to='/login' style={{ color: '#3490dc' }} >
						&nbsp;Login
					</Link>
				</div>
			</Wrapper>
		</>
	)
}

export default SignupPage