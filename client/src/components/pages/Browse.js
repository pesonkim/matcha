import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../ui/Wrapper'
import Preview from '../ui/Preview'

const BrowsePage = () => {
	const dispatch = useDispatch()

	const { loggedIn } = useSelector(state => state.user)

	const { latitude } = useSelector(state => state.user)
	const { longitude } = useSelector(state => state.user)
	const { errorMessage } = useSelector(state => state.form)
	const { notification } = useSelector(state => state.form)

	return (
		<>
			<Wrapper>
				Filters would go here
			</Wrapper>
			<div className='w-full max-w-screen-lg grid lg:grid-cols-3 gap-7 md:grid-cols-2 mx-auto px-2'>
				<Preview />
				<Preview />
				<Preview />
			</div>
		</>
	)
}

export default BrowsePage