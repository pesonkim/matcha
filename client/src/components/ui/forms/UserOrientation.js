import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

const UserOrientation = () => {
	//const { orientation } = useSelector(state => state.user)
	const dispatch = useDispatch()

	const [selected, setSelected] = useState([])

	const options = [
		{ value: 'male', label: 'male' },
		{ value: 'female', label: 'female' },
		{ value: 'other', label: 'other' },
	]

	//const selected = () => orientation ? orientation.map(o => ({ value: o, label: o })) : ''

	const handleChange = (option) => {
		const current = Array.isArray(option) ? option.map(i => i.value) : []
		console.log(current)
		setSelected(current)
		dispatch({
			type: 'ORIENTATION',
			data: {
				orientation: current
			}
		})
	}

	//console.log(selected)

	return (
		<>
			<label>Looking for</label>
			<Select
				isMulti
				name='orientation'
				value={selected.value}
				onChange={handleChange}
				options={options}
				className='mb-4'
			/>
		</>
	)
}

export default UserOrientation