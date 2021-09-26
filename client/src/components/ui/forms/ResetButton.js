import { useDispatch } from 'react-redux'

const ResetButton = () => {
	const dispatch = useDispatch()

	const style = {
		width: '100%',
		color: '#fff',
		padding: '.75rem',
		marginTop: '.25rem',
		marginBottom: '1rem'
	}

	const handler = () => {
		dispatch({
			type: 'RESETFILTERS',
		})
	}

	return (
		<div className='justify-center flex pt-4'>
			<button
				className='rounded bg-green-500 hover:bg-green-600 text-white ml-2 p-2'
				onClick={handler}
			>
				Reset filters
			</button>
		</div>
	)
}

export default ResetButton