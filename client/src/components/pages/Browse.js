import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../ui/Wrapper'
import Preview from '../ui/Preview'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getUsers } from '../../reducers/publicReducer'
import Filters from './Filters'

const BrowsePage = () => {
	const dispatch = useDispatch()
	const { tags, latitude, longitude } = useSelector(state => state.user)
	const { ids, users, sortFilter, filterTags, filterSliders, loadingUsers } = useSelector(state => state.public)

	useEffect(async () => {
		if (ids && sortFilter) {
			await dispatch(getUsers(filterTags, filterSliders, sortFilter, tags, latitude, longitude))
			dispatch({
				type: 'LOADINGUSERS',
				data: false
			})
		}
	}, [ids, sortFilter, filterTags, filterSliders])

	useEffect(() => {
		return () => {
			dispatch({
				type: 'LOADINGUSERS',
				data: true
			})
		}
	}, [])

	// useEffect(() => {
	// 	if (users.length && filterTags) {
	// 		const matches = users.filter(user => filterTags.every(tag => user.tags.includes(tag)))
	// 		// console.log('filter by', filterTags)
	// 		// console.log('matches', matches)
	// 		dispatch({
	// 			type: 'GETUSERS',
	// 			data: matches
	// 		})
	// 	}
	// }, [filterTags])

	// useEffect(() => {
	// 	if (previews.length) {
	// 		dispatch({
	// 			type: 'GETPREVIEWS',
	// 			data: previews
	// 		})
	// 	}
	// 	else if (users.length) {
	// 		dispatch({
	// 			type: 'GETPREVIEWS',
	// 			data: users.slice(0, 10)
	// 		})
	// 	}
	// }, [users])

	// const fetchMoreItems = () => {
	// 	if (previews.length >= users.length) {
	// 		return
	// 	}

	// 	dispatch({
	// 		type: 'GETPREVIEWS',
	// 		data: previews.concat(users.slice(previews.length, previews.length + 5))
	// 	})
	// 	// console.log('trigger')
	// }

	return (
		<>
			{/* {`total: ${users.length}`} */}
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
							No users match current filters
						</div>
					</Wrapper>
			}
			{/* <InfiniteScroll
				className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-5 mx-auto my-4 px-2"
				dataLength={previews.length}
				next={fetchMoreItems}
				hasMore={users.length >= previews.length}
				loader={<h4>Loading...</h4>}
				style={{ overflow: 'visible' }}
			>
				{previews.map(profile => {
					//infinite scroll magic here
					return (
						<Link key={profile.id} to={`/browse/${profile.id}`}>
							<Preview user={profile} />
						</Link>
					)
				})}
			</InfiniteScroll> */}
		</>
	)
}

export default BrowsePage