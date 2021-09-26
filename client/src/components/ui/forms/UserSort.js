import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const UserSort = () => {
	const { sortFilter, ids } = useSelector(state => state.public)
	const dispatch = useDispatch()

	const options = [
		{ value: 'distance (ascending)', label: 'distance (ascending)' },
		{ value: 'distance (descending)', label: 'distance (descending)' },
		{ value: 'fame (ascending)', label: 'fame (ascending)' },
		{ value: 'fame (descending)', label: 'fame (descending)' },
		{ value: 'age (ascending)', label: 'age (ascending)' },
		{ value: 'age (descending)', label: 'age (descending)' },
	]

	const selected = () => sortFilter ? { value: sortFilter, label: sortFilter } : options[0]

	useEffect(() => {
		if (ids && !sortFilter) {
			dispatch({
				type: 'SETSORT',
				data: {
					sortFilter: selected().value
				}
			})
		}
	}, [sortFilter])

	const handleChange = (option) => {
		dispatch({
			type: 'SETSORT',
			data: {
				sortFilter: option.value
			}
		})
	}

	return (
		<>
			<label className=''>Sort by</label>
			<Select
				name='sort'
				value={selected()}
				onChange={handleChange}
				options={options}
				className='mb-4'
			/>
		</>
	)
}

export default UserSort