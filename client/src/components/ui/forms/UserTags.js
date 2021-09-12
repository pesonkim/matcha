import Select from 'react-select'
import { useState } from 'react'

const UserTags = () => {
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
			<label>My interests</label>
			<input type='text' name='tags' style={baseStyle} className='' />
			<Select
				isMulti
				value={selected}
				onChange={setSelected}
				options={options}
				style={baseStyle}
				className='mb-4'
			/>
		</>
	)
}

export default UserTags