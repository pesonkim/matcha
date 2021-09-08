const InputField = (props) => {
	const style = {
		display: 'block',
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		width: '100%',
		padding: '.75rem',
		marginBottom: '1rem'
	}

	return (
		<>
			<label>{props.name}</label>
			<input type={props.type} style={style} />
		</>
	)
}

export default InputField