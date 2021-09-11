import { Link, useParams } from 'react-router-dom'
import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import PasswordField from '../ui/forms/PasswordField'
import SubmitButton from '../ui/forms/SubmitButton'
import validate from '../../utils/validate'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setNotif } from '../../reducers/messageReducer'
import { reset } from '../../reducers/userReducer'

const ResetPage = () => {
	const { errorMessage } = useSelector(state => state.message)
	const { notification } = useSelector(state => state.message)
	const dispatch = useDispatch()
	let { token } = useParams()

	console.log(token)

	const handleSubmit = (event) => {
		event.preventDefault()

		const password = event.target.password.value
		const check = validate({ password: password })
		if (check.password) {
			dispatch(setError(check.password))
		} else {
			dispatch(reset({ password, token }))
		}
	}

	return (
		<>
			<Wrapper>
				<Heading title='Password reset' />
				{notification && <div className='mb-4 text-center text-green-500'>{notification}</div>}
				{notification === ''
					? <><form onSubmit={handleSubmit}>
						<label>Please enter a new password for your account</label>
						<PasswordField />
						<div className='text-red-500 mb-4'>{errorMessage}</div>
						<SubmitButton text='Set new password' />
					</form>
					<div className='text-center'>
						<Link to='/login' style={{ color: '#3490dc' }} >
							Back to login
						</Link>
					</div>
					</>
					: <div className='text-center'>
						<Link to='/login' style={{ color: '#3490dc' }} >
							Back to login
						</Link>
					</div>
				}

			</Wrapper>
		</>
	)
}

export default ResetPage