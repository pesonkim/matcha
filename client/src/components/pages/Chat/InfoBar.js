import { Link } from 'react-router-dom'
import { XIcon } from '@heroicons/react/outline'
import { useHistory } from 'react-router-dom'

const InfoBar = ({ room }) => {
	let history = useHistory()

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
				<div className='flex items-center hover:opacity-50' onClick={() => history.goBack()}>
					<XIcon className=' h-6 w-6' />
				</div>
			</section>
		</div>
	)
}

export default InfoBar