import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'

const ResultSort = () => {
	const { gender } = useSelector(state => state.form)
	const dispatch = useDispatch()

	const selected = () => gender ? { value: gender, label: gender } : ''

	const options = [
		{ value: 'All users', label: 'All users' },
		{ value: 'Users that like you', label: 'Users that like you' },
		{ value: 'Users that viewed you', label: 'Users that viewed you' },
	]

	const handleChange = (option) => {
		dispatch({
			type: 'GENDER',
			data: {
				gender: option.value
			}
		})
	}

	return (
		<>
			<Select
				name='gender'
				value={selected()}
				onChange={handleChange}
				options={options}
				className='mb-4'
			/>
		</>
	)
}

export default ResultSort