import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const UserSort = () => {
	const { sortFilter, ids } = useSelector(state => state.public)
	const dispatch = useDispatch()

	const options = [
		{ value: 'distance', label: 'distance' },
		{ value: 'fame', label: 'fame' },
		{ value: 'age (from young to old)', label: 'age (from young to old)' },
		{ value: 'age (from old to young)', label: 'age (from old to young)' },
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
			<label className='text-bold'>Sort by</label>
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