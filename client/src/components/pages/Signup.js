import { Link } from 'react-router-dom'
import { useState } from 'react'
import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import InputField from '../ui/forms/InputField'
import PasswordField from '../ui/forms/PasswordField'
import SubmitButton from '../ui/forms/SubmitButton'
import validate from '../../utils/validate'
import userService from '../../services/users'

const SignupPage = () => {
	const [errors, setErrors] = useState({})

	const inputStyle = {
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		padding: '.75rem',
		marginBottom: '1rem',
		width: '100%',
	}

	const createOptions = (start, end) => {
		let options = []

		for (let i = end; i >= start; i = i - 1) {
			options.push(<option key={i}>{i}</option>)
		}

		return options
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		const values = {
			firstname: event.target.firstname.value,
			lastname: event.target.lastname.value,
			birthdate: {
				day: event.target.day.value,
				month: event.target.month.value,
				year: event.target.year.value
			},
			username: event.target.username.value,
			email: event.target.email.value,
			password: event.target.password.value,
		}

		const errors = validate(values)

		if (Object.keys(errors).length > 0) {
			setErrors(errors)
		} else {
			userService
				.createUser(values)
				.then(() => {
					alert('signup succesful')
				})
		}
	}

	const onBlur = (event) => {
		const name = event.target.name
		const value = event.target.value

		const error = validate({ [name]: value })
		if (error[name]) {
			console.log({ [name]: error[name], })
			setErrors({ ...errors, [name]: error[name], })
		} else {
			setErrors({ ...errors, [name]: '', })
		}
	}

	return (
		<>
			<Wrapper>
				<Heading title='Signup' />
				<form onSubmit={handleSubmit}>
					<div className='flex'>
						<div className='inline-block mr-2 w-1/2'>
							<label>First name</label>
							{errors.firstname && <label className='text-red-500'> *</label>}
							<input name='firstname' type='text' style={inputStyle} onBlur={onBlur} />
						</div>
						<div className='inline-block ml-2 w-1/2'>
							<label>Last name</label>
							{errors.lastname && <label className='text-red-500'> *</label>}
							<input name='lastname' type='text' style={inputStyle} onBlur={onBlur} />
						</div>
					</div>
					<InputField type='text' name='username' errors={errors.username} onBlur={onBlur} />
					<label>Birthdate</label>
					{errors.birthdate && <label className='text-red-500'> *</label>}
					<div className='flex mt-2'>
						<div className='inline-block w-1/4'>
							<label>Day</label>
							<select name='day' type='text' style={inputStyle} >
								<option></option>
								{createOptions(1, 31)}
							</select>
						</div>
						<div className='inline-block w-1/4 mx-4'>
							<label>Month</label>
							<select name='month' type='text' style={inputStyle} >
								<option></option>
								{createOptions(1, 12)}
							</select>
						</div>
						<div className='inline-block w-1/2'>
							<label>Year</label>
							<select name='year' type='text' style={inputStyle} >
								<option></option>
								{createOptions(1900, 2010)}
							</select>
						</div>
					</div>
					<InputField type='text' name='email' errors={errors.email} onBlur={onBlur} />
					<PasswordField errors={errors.password} onBlur={onBlur} />
					<SubmitButton text='Create account' />
				</form>
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