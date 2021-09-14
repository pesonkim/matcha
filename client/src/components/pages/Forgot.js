import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import SubmitButton from '../ui/forms/SubmitButton'
import { useDispatch, useSelector } from 'react-redux'
import { setError, clear } from '../../reducers/formReducer'
import { forgot } from '../../reducers/userReducer'
import validate from '../../utils/validate'

const ForgotPage = () => {
	const { errorMessage } = useSelector(state => state.form)
	const { notification } = useSelector(state => state.form)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(clear())
	}, [])

	const handleSubmit = (event) => {
		event.preventDefault()

		const email = event.target.email.value
		const check = validate({ email: email })
		if (check.email) {
			dispatch(setError(check.email))
		} else {
			dispatch(forgot({ email }))
		}
	}

	const inputStyle = {
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		padding: '.75rem',
		width: '100%',
	}

	return (
		<>
			<Wrapper>
				<Heading title='Forgot your password?' />
				{notification && <div className='mb-4 text-center text-green-500'>{notification}</div>}
				{notification === ''
					? <><form onSubmit={handleSubmit}>
						<p className='mb-4'>Please enter the <b>email address</b> associated with your account to receive a link to reset your password.</p>
						<input name='email' type='text' style={inputStyle} />
						<div className='text-red-500 mb-4'>{errorMessage}</div>
						<SubmitButton text='Send password reset email' />
					</form>
					<div className='text-center'>
						<Link to='/login' style={{ color: '#3490dc' }} >
							Back to login
						</Link>
					</div></>
					: <div className='text-center'>
						<Link to='/login' style={{ color: '#3490dc' }} >
							Back to login
						</Link>
					</div>
				}
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

export default ForgotPage