import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../ui/Wrapper'
import Preview from '../ui/Preview'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getUsers, filterUsers } from '../../reducers/publicReducer'
import Filters from './Filters'

const BrowsePage = () => {
	const dispatch = useDispatch()
	// const loading = useRef(true)
	const { latitude, longitude } = useSelector(state => state.user)
	const { ids, users, previews, sortFilter, filterTags, loading } = useSelector(state => state.public)

	useEffect(async () => {
		if (ids && sortFilter) {
			await dispatch(getUsers(sortFilter, latitude, longitude))
			// console.log(users, filterTags)
			if (users && filterTags.length) {
				const matches = users.filter(user => filterTags.every(tag => user.tags.includes(tag)))
				// console.log('filter by', filterTags)
				// console.log('matches', matches)
				dispatch({
					type: 'GETPREVIEWS',
					data: matches
				})
			}
			dispatch({
				type: 'SETLOADING',
			})
		}
	}, [ids, sortFilter, filterTags])

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
			{loading
				? <Wrapper>
					<div className='text-center'>
						Loading users...
					</div>
				</Wrapper>
				: null
			}
			{previews.length
				? <div className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-5 mx-auto my-4 px-2">
					{previews.map(profile => {
						//infinite scroll magic here
						return (
							<Link key={profile.id} to={`/browse/${profile.id}`}>
								<Preview user={profile} />
							</Link>
						)
					})

					}
				</div>
				: loading
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