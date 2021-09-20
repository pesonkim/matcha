import { HeartIcon, FlagIcon, BanIcon } from '@heroicons/react/solid'

const Actions = ({ room }) => {
	const divStyle = {
		borderBottomWidth: '2px',
		borderColor: '#dae4e9',
	}

	const buttonStyle = {
		color: '#3490dc',
	}

	return (
		<div className="w-full flex justify-between sm:px-4" style={divStyle}>
			<div className='flex flex-row items-center p-4 select-none cursor-pointer hover:underline text-pink-500'>
				<HeartIcon className=' h-8 w-8 mr-2' />
				<span>Like</span>
			</div>
			<div className='flex flex-row items-center p-4 select-none cursor-pointer hover:underline text-gray-800'>
				<FlagIcon className=' h-8 w-8 mr-2' />
				<span>Report</span>
			</div>
			<div className='flex flex-row items-center p-4 select-none cursor-pointer hover:underline text-gray-800'>
				<BanIcon className=' h-8 w-8 mr-2' />
				<span>Block</span>
			</div>
		</div>
	)
}

export default Actions