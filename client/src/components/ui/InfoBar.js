import { Link } from 'react-router-dom'
import { XIcon } from '@heroicons/react/outline'

const InfoBar = ({ room }) => {
	const style = {
		height: '60px',
		borderBottomWidth: '2px',
		borderColor: '#dae4e9',
	}

	return (
		<div className="w-full flex justify-between items-center p-4" style={style}>
			<section className="flex items-center">
				<h2>{room}</h2>
			</section>
			<section className="flex items-center">
				<Link to='/' className='flex items-center hover:opacity-50'>
					<XIcon className=' h-6 w-6' />
				</Link>
			</section>
		</div>
	)
}

export default InfoBar