import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'

const UserGender = () => {
	const { gender } = useSelector(state => state.form)
	const dispatch = useDispatch()

	const selected = () => gender ? { value: gender, label: gender } : ''

	const options = [
		{ value: 'male', label: 'male' },
		{ value: 'female', label: 'female' },
		{ value: 'other', label: 'other' },
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
			<label>Gender</label>
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

export default UserGender