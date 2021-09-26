import Wrapper from '../ui/Wrapper'
import Heading from '../ui/forms/Heading'
import FilterTags from '../ui/forms/FilterTags'
import UserSort from '../ui/forms/UserSort'
import ResultSort from '../ui/forms/ResultSort'
import SliderFilter from '../ui/forms/Slider'
import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import ResetButton from '../ui/forms/ResetButton'

const Togglable = (props) => {
	const [visible, setVisible] = useState(false)

	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = (event) => {
		event.preventDefault()
		setVisible(!visible)
	}

	const Show = () => <ChevronDownIcon className='w-8 h-8' />
	const Hide = () => <ChevronUpIcon className='w-8 h-8' />

	return (
		<>
			<div className='flex justify-between items-center'>
				<p className=''>{props.text || ''}</p>
				<button tabIndex={-1} onClick={toggleVisibility}>{visible ? Hide() : Show()}</button>
			</div>
			<div style={showWhenVisible} className='mt-2'>
				{props.children}
			</div>
		</>
	)
}

const Filters = () => {
	return (
		<Wrapper>
			<Heading title='View users' />
			{/* <ResultSort />
			<hr className='my-2' /> */}
			<UserSort />
			<hr className='my-2' />
			<Togglable text='User filters'>
				<FilterTags />
				<SliderFilter />
				<ResetButton />
			</Togglable>
		</Wrapper>
	)
}

export default Filters