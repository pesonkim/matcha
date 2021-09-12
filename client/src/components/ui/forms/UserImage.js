const UserImage = () => {
	const baseStyle = {
		display: 'block',
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		width: '100%',
		padding: '.75rem',
		marginBottom: '1rem',
	}

	return (
		<>
			<label>Image upload magic</label>
			<input type='text' name='image' style={baseStyle} className='' />
		</>
	)
}

export default UserImage