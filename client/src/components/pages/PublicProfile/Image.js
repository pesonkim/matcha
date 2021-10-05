import { HeartIcon as MatchIcon } from '@heroicons/react/solid'
import { HeartIcon } from '@heroicons/react/outline'

const Image = ({ image, status }) => {
	const divStyle = {
		height: '300px',
		maxHeight: '100%',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		overflow: 'hidden',
		backgroundColor: 'rgba(248,247,251,255)',
		position: 'relative'
	}

	const imgStyle = {
		objectFit: 'contain',
		height: 'auto',
		width: '100%',
		maxHeight: '100%',
		maxWidth: '100%',
		margin: 'auto',
	}

	return (
		<div style={divStyle} >
			<img src={image ? image : 'https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png'} alt='avatar' style={imgStyle} />
			{status && <div className='absolute bottom-2 right-2 bg-white rounded-full shadow '>
				<div className='flex flex-row items-center p-1'>
					{status === 'match'
						? <MatchIcon className='h-6 w-6 text-pink-500' />
						: <HeartIcon className='h-6 w-6 text-pink-500' />
					}
					<span>{status}</span>
				</div>
			</div>}
		</div>
	)
}

export default Image