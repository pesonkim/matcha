const SubmitButton = (props) => {
	const style = {
		width: '100%',
		color: '#fff',
		padding: '.75rem',
		marginTop: '.25rem',
		marginBottom: '1rem',
		backgroundColor: '#38c172'
	}

	return (
		<button style={style} className='rounded'>
			{props.text}
		</button>
	)
}

export default SubmitButton