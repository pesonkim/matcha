const UserBio = () => {
	const baseStyle = {
		display: 'block',
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		width: '100%',
		padding: '.75rem',
		marginBottom: '1rem',
		resize: 'none',
	}

	return (
		<>
			<label>About me</label>
			<textarea type='text' name='bio' style={baseStyle} className='' />
		</>
	)
}

export default UserBio