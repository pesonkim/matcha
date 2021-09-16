import { avatar } from '../../../reducers/formReducer'
import { useSelector, useDispatch } from 'react-redux'
import { TrashIcon } from '@heroicons/react/outline'
import photosService from '../../../services/photos'

const UserImage = () => {
	const { token } = useSelector(state => state.user)
	const { photo } = useSelector(state => state.form)
	const dispatch = useDispatch()

	const baseStyle = {
		display: 'block',
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		width: '100%',
		padding: '.75rem',
		marginBottom: '1rem',
	}

	const icon = {
		position: 'absolute',
		top: 15,
		right: 15,
	}

	const imgStyle = {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
	}

	const handleImage = (event) => {
		event.preventDefault()
		console.log(event)

		let file = event.target.files[0]
		const formData = new FormData()
		formData.append('file', file)
		dispatch(avatar(formData, token))
	}

	return (
		<form>

			<label>Profile picture</label>
			<input name='photo' type='file' style={baseStyle} onChange={handleImage} accept=".png, .jpg .jpeg" />
		</form>
	)
}

export default UserImage