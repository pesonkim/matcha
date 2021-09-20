import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../ui/Wrapper'
import Preview from '../ui/Preview'
import PublicProfile from './PublicProfile'

const BrowsePage = () => {
	const dispatch = useDispatch()

	const { loggedIn } = useSelector(state => state.user)

	const { latitude } = useSelector(state => state.user)
	const { longitude } = useSelector(state => state.user)
	const { errorMessage } = useSelector(state => state.form)
	const { notification } = useSelector(state => state.form)

	return (
		<>
			<PublicProfile />
		</>
	)
}

export default BrowsePage