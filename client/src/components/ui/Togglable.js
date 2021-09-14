import { useState } from 'react'

const Togglable = (props) => {
	const [visible, setVisible] = useState(false)

	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = (event) => {
		event.preventDefault()
		setVisible(!visible)
	}

	return (
		<>
			<div className='flex justify-between my-4'>
				<p className=' font-bold'>{props.text || ''}</p>
				<button style={{ color: '#3490dc' }} tabIndex={-1} onClick={toggleVisibility}>{visible ? 'Hide' : 'Show'}</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
			</div>
		</>
	)
}

export default Togglable