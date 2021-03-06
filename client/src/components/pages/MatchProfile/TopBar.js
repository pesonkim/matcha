import { XIcon } from '@heroicons/react/outline'
import { useHistory } from 'react-router-dom'

const TopBar = ({ online, firstname, age }) => {
	let history = useHistory()

	return (
		<div className="w-full flex items-center justify-between p-4 overflow-hidden" >
			<section className="flex items-center overflow-hidden w-2/3">
				{online
					? <span className='text-green-500'>●&nbsp;</span>
					: <span className='text-red-500'>●&nbsp;</span>
				}
				<span className='truncate text-2xl'>{firstname}</span>
				,
				<span className='ml-2 text-2xl'>{age}</span>
			</section>
			<section className="flex items-center cursor-pointer select-none" onClick={() => history.goBack()}>
				<span className='sm:block hidden'>Back to browse</span>
				<XIcon className='ml-2 h-8 w-8' />
			</section>
		</div>
	)
}

export default TopBar