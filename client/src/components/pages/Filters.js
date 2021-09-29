import Wrapper from '../ui/Wrapper'
import FilterTags from '../ui/forms/FilterTags'
import UserSort from '../ui/forms/UserSort'
import SliderFilter from '../ui/forms/Slider'
import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import { useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip'

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
	const { users } = useSelector(state => state.public)
	const { blocks } = useSelector(state => state.match)

	return (
		<Wrapper>
			<div data-tip data-for='results' >
				<h1 className='text-3xl text-center mb-4' >
					View users
				</h1>
				<ReactTooltip id='results'>
					{`total: ${users.length}, blocks: ${blocks ? blocks.length : null}`}
				</ReactTooltip>
			</div>
			<UserSort />
			<hr className='my-2' />
			<Togglable text='User filters'>
				<FilterTags />
				<SliderFilter />
			</Togglable>
		</Wrapper>
	)
}

export default Filters