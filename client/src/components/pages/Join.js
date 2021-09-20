import { useState } from 'react'
import { Link } from 'react-router-dom'

import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import SubmitButton from '../ui/forms/SubmitButton'

const Join = () => {
	const inputStyle = {
		borderWidth: '1px',
		borderColor: '#dae4e9',
		borderRadius: '.25rem',
		padding: '.75rem',
		width: '100%',
		height: '38px'
	}

	const [name, setName] = useState('')
	const [room, setRoom] = useState('')


	return (
		<Wrapper>
			<Heading title='Join' />
			<label>Name</label>
			<input name='email' type='text' style={inputStyle} onChange={e => setName(e.target.value)} className='mb-4' />
			<label>Room</label>
			<input name='email' type='text' style={inputStyle} onChange={e => setRoom(e.target.value)} className='mb-4' />
			<Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`} tabIndex={-1}>
				<SubmitButton text='Join a chat room' />
			</Link>
		</Wrapper>
	)
}

export default Join