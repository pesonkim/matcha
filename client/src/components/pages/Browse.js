import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../ui/Wrapper'
import Preview from '../ui/Preview'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../../reducers/publicReducer'
import Filters from './Filters'

const BrowsePage = () => {
	const dispatch = useDispatch()
	const { tags, latitude, longitude } = useSelector(state => state.user)
	const { ids, users, sortFilter, filterTags, filterSliders, loadingUsers } = useSelector(state => state.public)
	const { blocks } = useSelector(state => state.match)

	useEffect(async () => {
		if (sortFilter && blocks) {
			await dispatch(getUsers(filterTags, filterSliders, sortFilter, tags, latitude, longitude, blocks))
			dispatch({
				type: 'LOADINGUSERS',
				data: false
			})
		}
	}, [ids, sortFilter, filterTags, filterSliders, blocks])

	useEffect(() => {
		return () => {
			dispatch({
				type: 'LOADINGUSERS',
				data: true
			})
		}
	}, [])

	return (
		<>
			<Filters />
			{loadingUsers
				? <Wrapper>
					<div className='text-center'>
						Loading users...
					</div>
				</Wrapper>
				: null
			}
			{users.length
				? <div className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-5 mx-auto my-4 px-2">
					{users.map(profile => {
						return (
							<Link key={profile.id} to={`/browse/${profile.id}`}>
								<Preview user={profile} />
							</Link>
						)
					})

					}
				</div>
				: loadingUsers
					? null
					: <Wrapper>
						<div className='text-center'>
							No users match current filters or location
						</div>
					</Wrapper>
			}
		</>
	)
}

export default BrowsePage