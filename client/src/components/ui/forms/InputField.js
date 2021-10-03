const InputField = (props) => {
	const style = {
		display: 'block',
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		width: '100%',
		padding: '.75rem',
	}

	let error = ''
	if (props.errors) {
		error = (props.errors.includes('required')) ? '' : props.errors
	}

	return (
		<>
			<label>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</label>
			{props.errors && <label className='text-red-500'> *</label>}
			<input name={props.name} type={props.type} style={style} onBlur={props.onBlur} maxLength='255'/>
			<div className='text-red-500 mb-4'>{error}</div>
		</>
	)
}

export default InputField