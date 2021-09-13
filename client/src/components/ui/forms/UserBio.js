import { useSelector, useDispatch } from 'react-redux'

const UserBio = () => {
	const { bio } = useSelector(state => state.user)
	const dispatch = useDispatch()

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

	const handleChange = (event) => {
		event.preventDefault()
		dispatch({
			type: 'BIO',
			data: {
				bio: event.target.value
			}
		})
	}

	return (
		<>
			<label>About me</label>
			<textarea type='text' maxLength='280' defaultValue={bio ? bio : ''} name='bio' style={baseStyle} onBlur={handleChange} className='' />
		</>
	)
}

export default UserBio