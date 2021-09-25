import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../ui/Wrapper'
import Preview from '../ui/Preview'
import PublicProfile from './PublicProfile'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getUsers } from '../../reducers/publicReducer'
import Filters from './Filters'

const BrowsePage = () => {
	const dispatch = useDispatch()
	const { latitude, longitude } = useSelector(state => state.user)
	const { ids, users, sortFilter } = useSelector(state => state.public)

	useEffect(async () => {
		if (ids && sortFilter) {
			await dispatch(getUsers(sortFilter, latitude, longitude))
		}
	}, [ids, sortFilter])

	// useEffect(() => {
	// 	if (users.length) {
	// 		console.log('sort')
	// 		console.log(sortFilter)
	// 	}
	// }, [users])

	// useEffect(() => {
	// 	if (users.length && sortFilter) {
	// 		console.log('sortem')
	// 		console.log(sortFilter)
	// 		dispatch({
	// 			type: 'SORTUSERS',
	// 			data: users
	// 		})

	// 	}
	// }, [sortFilter])

	// const links = users.map(profile => {
	// 	return (
	// 		<Link key={profile.id} to={`/browse/${profile.id}`} className='overflow-visible'>
	// 			<Preview user={profile} />
	// 		</Link>
	// 	)
	// })


	// const [items, setItems] = useState(links.slice(0, 5))
	// const [hasMore, setHasMore] = useState(items.length >= links.length ? false : true)

	// const fetchMoreItems = () => {
	// 	if (items.length >= links.length) {
	// 		setHasMore(false)
	// 		return
	// 	}

	// 	setItems(
	// 		items.concat(links.slice(items.length, items.length + 5))
	// 	)
	// 	// console.log('trigger')
	// }

	// useEffect(() => {
	// 	console.log('1')
	// 	if (hasMore && document.documentElement.clientHeight <= document.body.scrollHeight) {
	// 		console.log('2')
	// 		fetchMoreItems()
	// 	}
	// }, [hasMore])

	return (
		<>
			{/* {`total: ${users.length}`} */}
			<Filters />
			<div className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-5 mx-auto my-4 px-2">
				{users.map(profile => {
					//infinite scroll magic here
					return (
						<Link key={profile.id} to={`/browse/${profile.id}`}>
							<Preview user={profile} />
						</Link>
					)
				})}
			</div>
			{/* <InfiniteScroll
				className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-5 mx-auto my-4 px-2"
				dataLength={items.length}
				next={fetchMoreItems}
				hasMore={hasMore}
				loader={<h4>Loading...</h4>}
				style={{ overflow: 'visible' }}
			>
				{items}
			</InfiniteScroll> */}
		</>
	)
}

export default BrowsePage