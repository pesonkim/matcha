import { useState } from 'react'

const PasswordField = (props) => {
	const [show, setShow] = useState(false)

	const style = {
		display: 'block',
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		width: '100%',
		padding: '.75rem',
	}

	const button = {
		position: 'absolute',
		top: 15,
		right: 15,
	}

	const toggle = event => {
		event.preventDefault()
		setShow(!show)
	}

	let error = ''
	if (props.errors) {
		error = (props.errors.includes('required')) ? '' : props.errors
	}

	return (
		<div>
			{props.errors && <label className='text-red-500'> *</label>}
			<div className='relative'>
				<input name='password' type={show ? 'text' : 'password'} style={style} onBlur={props.onBlur}/>
				<button tabIndex={-1} style={button} onClick={toggle}>{show ? 'Hide' : 'Show'}</button>
			</div>
			<div className='text-red-500 mb-4'>{error}</div>
		</div>
	)
}

export default PasswordField

