const SubmitButton = (props) => {
	const style = {
		width: '100%',
		color: '#fff',
		padding: '.75rem',
		marginTop: '.25rem',
		marginBottom: '1rem'
	}

	return (
		<button type='submit' style={style} className='rounded bg-green-500 hover:bg-green-600'>
			{props.text}
		</button>
	)
}

export default SubmitButton