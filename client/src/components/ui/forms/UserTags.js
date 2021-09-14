import CreatableSelect from 'react-select/creatable'
import { useSelector, useDispatch } from 'react-redux'

const UserTags = () => {
	const { tags } = useSelector(state => state.form)
	const dispatch = useDispatch()

	const selected = () => tags ? tags.map(o => ({ value: o, label: o })) : []

	const handleChange = (option) => {
		const current = Array.isArray(option) ? option.map(i => (i.value.substr(0, 1) !== '#' ? '#' : '') + i.value) : []
		//console.log(current)
		dispatch({
			type: 'TAGS',
			data: {
				tags: current
			}
		})
	}

	return (
		<>
			<label>My interests</label>
			<CreatableSelect
				isMulti
				name='tags'
				placeholder='Type new tags or select...'
				value={selected()}
				onChange={handleChange}
				className='mb-4'
			/>
		</>
	)
}

export default UserTags