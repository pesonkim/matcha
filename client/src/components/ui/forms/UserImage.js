import { avatar } from '../../../reducers/formReducer'
import { useSelector, useDispatch } from 'react-redux'
import { TrashIcon } from '@heroicons/react/outline'

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

	const handleImage = async (event) => {
		event.preventDefault()

		let file = event.target.files[0]
		const formData = new FormData()
		formData.append('file', file)
		dispatch(avatar(formData, token))
	}

	return (
		<div>
			{photo
				? <div className="w-48 h-48 flex mb-4 mx-auto relative">
					<div className="bg-red-500 w-full h-full rounded-full overflow-hidden">
						<img src={photo}/>
					</div>
				</div>
				: ''
			}
			<label>Profile picture</label>
			<input name='photo' type='file' style={baseStyle} onChange={handleImage} accept=".png, .jpg .jpeg" />
		</div>
	)
}

export default UserImage