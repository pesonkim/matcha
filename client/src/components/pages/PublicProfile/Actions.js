import { HeartIcon, FlagIcon, BanIcon } from '@heroicons/react/solid'
import { useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'

const ReportButton = ({ user, onClick, action }) => (
	<div className='flex-1 w-1/3'>
		<div className='flex flex-row items-center justify-center p-4 select-none cursor-pointer hover:underline text-gray-800' onClick={() => onClick({ type: 'report', user, action })}>
			<FlagIcon className=' h-8 w-8 mr-2' />
			<span>Report</span>
		</div>
	</div>
)

const CantReportButton = () => (
	<div className='flex-1 w-1/3'>
		<div className='flex flex-row items-center justify-center p-4 select-none text-gray-500' data-tip='You have already reported this user'>
			<FlagIcon className=' h-8 w-8 mr-2' />
			<span>Report</span>
			<ReactTooltip />
		</div>
	</div>
)

const BlockButton = ({ user, onClick, action }) => (
	<div className='flex-1 w-1/3'>
		<div className='flex flex-row items-center justify-center p-4 select-none cursor-pointer hover:underline text-gray-800' onClick={() => onClick({ type: 'block', user, action })}>
			<BanIcon className=' h-8 w-8 mr-2' />
			<span>Block</span>
		</div>
	</div>
)

const UnlikeButton = ({ user, action, setModal, id }) => (
	<div className='flex-1 w-1/3'>
		<div className='flex flex-row items-center justify-center p-4 select-none cursor-pointer hover:underline text-pink-500 ' onClick={() => setModal({ type: 'unlike', user, action, likeid: id })}>
			<HeartIcon className=' h-8 w-8 mr-2' />
			<span>Unlike</span>
		</div>
	</div>
)

const LikeButton = ({ onClick }) => (
	<div className='flex-1 w-1/3'>
		<div className='flex flex-row items-center justify-center p-4 select-none cursor-pointer hover:underline text-gray-800 hover:text-pink-500 transition duration-500 ease-in-out' onClick={() => onClick({ type: 'new' })}>
			<HeartIcon className=' h-8 w-8 mr-2' />
			<span>Like</span>
		</div>
	</div>
)

const CantLikeButton = () => (
	<div className='flex-1 w-1/3'>
		<div className='flex flex-row items-center justify-center p-4 select-none text-gray-500' data-tip='Your profile needs an avatar before you can leave likes'>
			<HeartIcon className=' h-8 w-8 mr-2' />
			<span>Like</span>
			<ReactTooltip />
		</div>
	</div>
)

const Actions = ({ user, handleLike, askConfirm, setModal, handleReport, handleBlock }) => {
	const { avatar } = useSelector(state => state.user)
	const { profile } = useSelector(state => state.public)
	const { reports, likes } = useSelector(state => state.match)

	const reported = reports.find(r => r.receiver === profile.id) ? true : false
	const liked = likes.find(r => r.receiver === profile.id)

	return (
		<div className="w-full flex sm:px-4" >
			{avatar
				? liked
					? <UnlikeButton user={user} action={handleLike} setModal={setModal} id={liked.id}/>
					: <LikeButton onClick={handleLike} />
				: <CantLikeButton />
			}
			{reported
				? <CantReportButton />
				: <ReportButton user={user.firstname} onClick={askConfirm} action={handleReport} />
			}
			<BlockButton user={user.firstname} onClick={askConfirm} action={handleBlock} />
		</div>
	)
}

export default Actions