import CreatableSelect from 'react-select/creatable'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getTags } from '../../../reducers/publicReducer'

const UserTags = () => {
	const { tags } = useSelector(state => state.form)
	const { allTags } = useSelector(state => state.public)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getTags())
	}, [])

	const selected = () => tags ? tags.map(o => ({ value: o, label: o })) : []
	const options = () => allTags ? allTags.map(o => ({ value: o, label: o })) : []

	const handleChange = (option) => {
		const current = Array.isArray(option) ? option.map(i => (i.value.substr(0, 1) !== '#' ? '#' : '') + i.value) : []
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
				placeholder='Select or type...'
				value={selected()}
				options={options()}
				onChange={handleChange}
				className='mb-4'
			/>
		</>
	)
}

export default UserTags