import Select from 'react-select'
import { useState } from 'react'

const UserGender = () => {
	const baseStyle = {

	}

	const [selected, setSelected] = useState(null)

	const options = [
		{ value: 'male', label: 'male' },
		{ value: 'female', label: 'female' },
		{ value: 'other', label: 'other' },
	]

	return (
		<>
			<label>Gender</label>
			<Select
				name='gender'
				value={selected}
				onChange={setSelected}
				options={options}
				style={baseStyle}
				className='mb-4'
			/>
		</>
	)
}

export default UserGender