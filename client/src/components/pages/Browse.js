import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../ui/Wrapper'
import Preview from '../ui/Preview'
import PublicProfile from './PublicProfile'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const BrowsePage = () => {
	const dispatch = useDispatch()
	const { users } = useSelector(state => state.public)
	const { orientation } = useSelector(state => state.user)

	return (
		<>
			{`total: ${users.length}`}
			{users.map(user => {
				return (
					<Link key={user.id} to={`/browse/${user.id}`}>
						<p>
							<strong>id: </strong>{user.id}
							<strong> user: </strong>{user.username}
							<strong> gender: </strong>{user.gender}
							<strong> looking for: </strong>{user.orientation.join(',')}
							<strong> age: </strong>{user.age}
						</p>
					</Link>
				)
			})}
			{/* <PublicProfile /> */}
			{/* <div className="w-full max-w-screen-lg grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-2 md:gap-3 lg:gap-5 mx-auto my-4 px-2">
				<Preview />
				<Preview />
				<Preview />
			</div> */}
		</>
	)
}

export default BrowsePage