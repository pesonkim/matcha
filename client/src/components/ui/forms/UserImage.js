import { useSelector, useDispatch } from 'react-redux'
import { TrashIcon } from '@heroicons/react/outline'

const UserImage = () => {
	const { photoStr } = useSelector(state => state.form)
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
		width: '200px',
		height: '200px',
		borderRadius: '50%',
		margin: 'auto',
	}

	const handleImage = (event) => {
		event.preventDefault()

		const reader = new FileReader()
		const file = event.target.files[0]

		if (!file) {
			return
		} else if (file.size > 1000000) {
			dispatch({
				type: 'ERROR',
				data: 'Max file size is 1Mb'
			})
			return
		}

		reader.readAsDataURL(file)
		reader.onloadend = () => {
			dispatch({
				type: 'PREVIEW',
				data: reader.result
			})
		}
	}

	return (
		<>
			<div className='mb-4 mx-auto'>
				{photoStr && <img src={photoStr} style={imgStyle}/>}
			</div>
			<label>Profile picture</label>
			<input name='photo' type='file' style={baseStyle} onChange={handleImage} accept=".png, .jpg .jpeg" />
		</>
	)
}

export default UserImage