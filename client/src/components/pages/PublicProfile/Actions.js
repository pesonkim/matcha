import { HeartIcon, FlagIcon, BanIcon } from '@heroicons/react/solid'
import { useSelector, useDispatch } from 'react-redux'
import ReactTooltip from 'react-tooltip'

const ReportButton = ({ user, onClick, action }) => (
	<div className='flex flex-row items-center p-4 select-none cursor-pointer hover:underline text-gray-800' onClick={() => onClick({ type: 'report', user, action })}>
		<FlagIcon className=' h-8 w-8 mr-2' />
		<span>Report</span>
	</div>
)

const BlockButton = ({ user, onClick, action }) => (
	<div className='flex flex-row items-center p-4 select-none cursor-pointer hover:underline text-gray-800' onClick={() => onClick({ type: 'block', user, action })}>
		<BanIcon className=' h-8 w-8 mr-2' />
		<span>Block</span>
	</div>
)

const LikeButton = ({ onClick }) => (
	<div className='flex flex-row items-center p-4 select-none cursor-pointer hover:underline text-gray-800' onClick={e => onClick(e)}>
		<HeartIcon className=' h-8 w-8 mr-2' />
		<span>Like</span>
	</div>
)

const CantLikeButton = () => (
	<div className='flex flex-row items-center p-4 select-none text-gray-500' data-tip='Your profile needs an avatar before you can leave likes'>
		<HeartIcon className=' h-8 w-8 mr-2' />
		<span>Like</span>
		<ReactTooltip />
	</div>
)

const Actions = ({ user, handleLike, askConfirm, handleReport, handleBlock }) => {
	const { avatar } = useSelector(state => state.user)

	const divStyle = {
		borderBottomWidth: '2px',
		borderColor: '#dae4e9',
	}

	return (
		<div className="w-full flex justify-between sm:px-4" style={divStyle}>
			{avatar
				? <LikeButton onClick={handleLike}/>
				: <CantLikeButton />
			}
			<ReportButton user={user} onClick={askConfirm} action={handleReport}/>
			<BlockButton user={user} onClick={askConfirm} action={handleBlock}/>
		</div>
	)
}

export default Actions