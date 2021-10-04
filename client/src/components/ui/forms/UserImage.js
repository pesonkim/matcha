import { useSelector, useDispatch } from 'react-redux'
import imageCompression from 'browser-image-compression'

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

	const imgStyle = {
		width: 'auto',
		height: 'auto',
		maxWidth: '100%',
		maxHeight: '300px',
		margin: 'auto',
	}

	const handleImage = async (event) => {
		event.preventDefault()

		const imageFile = event.target.files[0]

		const options = {
			maxSizeMB: 0.5,
			maxWidthOrHeight: 1920,
			useWebWorker: true
		}

		if (!imageFile) {
			return
		} else if (imageFile.size > 1000000) {
			dispatch({
				type: 'ERROR',
				data: 'Max file size is 1Mb'
			})
			event.target.value = null
			return
		}

		try {
			const compressedFile = await imageCompression(imageFile, options)
			const objectURL = URL.createObjectURL(compressedFile)
			dispatch({
				type: 'PREVIEW',
				data: objectURL
			})
			dispatch({
				type: 'CLEAR',
			})
		} catch (error) {
			if (error.target instanceof HTMLElement) {
				dispatch({
					type: 'ERROR',
					data: 'Not a valid image file'
				})
			} else {
				dispatch({
					type: 'ERROR',
					data: 'Image upload failed'
				})
			}
			event.target.value = null
		}
	}

	return (
		<>
			<div className='mb-4 mx-auto'>
				{photoStr && <img src={photoStr} alt='avatar' style={imgStyle} />}
			</div>
			<label>Profile picture</label>
			<input name='photo' type='file' style={baseStyle} onChange={handleImage} accept=".png, .jpg .jpeg" />
		</>
	)
}

export default UserImage