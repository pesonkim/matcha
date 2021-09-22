import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../ui/Wrapper'
import Preview from '../ui/Preview'
import PublicProfile from './PublicProfile'
import { useEffect } from 'react'

import userService from '../../services/users'

const BrowsePage = () => {
	const dispatch = useDispatch()

	const { loggedIn } = useSelector(state => state.user)

	const { latitude } = useSelector(state => state.user)
	const { longitude } = useSelector(state => state.user)
	const { errorMessage } = useSelector(state => state.form)
	const { notification } = useSelector(state => state.form)

	useEffect(async () => {
		let data
		try {
			data = await userService.getUsers()
			console.log(data)
		} catch (error) {
			if (error.response && error.response.data) {
				data = error.response.data.error
			} else {
				data = 'Database error'
			}
			dispatch({
				type: 'ERROR',
				data,
			})
		}
	}, [])

	return (
		<>
			<PublicProfile />
			{/* <div className="w-full max-w-screen-lg grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-2 md:gap-3 lg:gap-5 mx-auto my-4 px-2">
				<Preview />
				<Preview />
				<Preview />
			</div> */}
		</>
	)
}

export default BrowsePage