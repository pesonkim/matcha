import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../ui/Wrapper'
import Preview from '../ui/Preview'
import PublicProfile from './PublicProfile'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const BrowsePage = () => {
	const dispatch = useDispatch()
	const { users } = useSelector(state => state.public)
	const { orientation } = useSelector(state => state.user)

	return (
		<>
			{`total: ${users.length}`}
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
		</>
	)
}

export default BrowsePage