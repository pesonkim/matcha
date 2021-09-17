import { useSelector, useDispatch } from 'react-redux'
import Wrapper from '../ui/Wrapper'

const PublicProfile = () => {
	const { avatar } = useSelector(state => state.user)

	return (
		<Wrapper>
			<h4 className="mb-2 text-2xl">Title</h4>
			<img className=" w-60 h-60" src={avatar} />
			<span className="my-4">tags</span>
			<span className="text-gray-500">fame</span>
		</Wrapper>
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