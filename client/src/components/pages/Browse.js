//import { Link } from 'react-router-dom'
import Wrapper from '../ui/Wrapper'
import Preview from '../ui/Preview'

const BrowsePage = () => {
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