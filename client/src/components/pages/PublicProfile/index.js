import { useSelector, useDispatch } from 'react-redux'
import TopBar from './TopBar'
import Image from './Image'
import Info from './Info'
import Actions from './Actions'

const PublicProfile = ({ user }) => {
	console.log(user)

	return (
		// <Wrapper>
		// 	<h4 className="mb-2 text-2xl">Title</h4>
		// 	<img className=" w-60 h-60" src={avatar} />
		// 	<span className="my-4">tags</span>
		// 	<span className="text-gray-500">fame</span>
		// </Wrapper>
		<div className='max-w-screen-sm mx-auto px-2 '>
			<div className='flex flex-col justify-center my-4 bg-white rounded ui-shadow'>
				<TopBar />
				<Image image={user.avatar}/>
				<Info />
				<Actions />
			</div>
		</div>
	)
}

export default PublicProfile

//navlink back
//avatar
//name
//age
//distance
//bio
//gender orientation
//tags
//last online
//actions, like report block
//fame?