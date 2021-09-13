import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'

const UserOrientation = () => {
	const { orientation } = useSelector(state => state.user)
	const dispatch = useDispatch()

	const selected = () => orientation ? orientation.map(o => ({ value: o, label: o })) : []

	const options = [
		{ value: 'male', label: 'male' },
		{ value: 'female', label: 'female' },
		{ value: 'other', label: 'other' },
	]

	const handleChange = (option) => {
		const current = Array.isArray(option) ? option.map(i => i.value) : []
		//console.log(current)
		dispatch({
			type: 'ORIENTATION',
			data: {
				orientation: current
			}
		})
	}

	return (
		<>
			<label>Looking for</label>
			<Select
				isMulti
				name='orientation'
				value={selected()}
				onChange={handleChange}
				options={options}
				className='mb-4'
			/>
		</>
	)
}

export default UserOrientation