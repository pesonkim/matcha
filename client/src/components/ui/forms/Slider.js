import { useSelector, useDispatch } from 'react-redux'
import { Range, getTrackBackground } from 'react-range'
import { useState } from 'react'
import ReactTooltip from 'react-tooltip'

const SliderFilter = () => {
	const { filterSliders } = useSelector(state => state.public)
	const [distance, setDistance] = useState(filterSliders ? [filterSliders.distance] : [500])
	const [age, setAge] = useState(filterSliders ? [filterSliders.age[0], filterSliders.age[1]] : [16, 100])
	const [fame, setFame] = useState(filterSliders ? [filterSliders.fame[0], filterSliders.fame[1]] : [0, 500])
	const dispatch = useDispatch()

	const handleDistance = () => {
		// console.log('distance', distance)
		dispatch({
			type: 'SETSLIDERS',
			data: {
				...filterSliders,
				distance: distance,
			}
		})
	}

	const handleAge = () => {
		dispatch({
			type: 'SETSLIDERS',
			data: {
				...filterSliders,
				age: age.sort((a, b) => a - b),
			}
		})
	}

	const handleFame = () => {
		// console.log('fame', fame)
		dispatch({
			type: 'SETSLIDERS',
			data: {
				...filterSliders,
				fame: fame.sort((a, b) => a - b),
			}
		})
	}

	const handleReset = () => {
		setDistance([500])
		setAge([16, 100])
		setFame([0, 500])
		dispatch({
			type: 'RESETFILTERS',
		})
	}

	return (
		<div>
			<label className=''>Distance difference</label>
			<div className='pt-6 mx-2'>
				<Range
					values={distance}
					step={1}
					min={1}
					max={500}
					onChange={(values) => setDistance(values)}
					onFinalChange={handleDistance}
					renderTrack={({ props, children }) => (
						<div
							onMouseDown={props.onMouseDown}
							onTouchStart={props.onTouchStart}
							style={{
								...props.style,
								height: '14px',
								width: '100%',
								display: 'flex',
							}}
						>
							<div
								ref={props.ref}
								style={{
									height: '14px',
									width: '100%',
									borderRadius: '6px',
									background: getTrackBackground({
										values: distance,
										colors: ['#548BF4', '#ccc'],
										min: 1,
										max: 500,
									}),
									alignSelf: 'center'
								}}
							>
								{children}
							</div>
						</div>
					)}
					renderThumb={({ props }) => (
						<div
							{...props}
							style={{
								...props.style,
								height: '25px',
								width: '25px',
								borderRadius: '50%',
								backgroundColor: '#fff',
								alignItems: 'center',
								boxShadow: '0px 2px 6px #AAA'
							}}
							className='focus:outline-none'
							data-tip
							data-for='distanceSlider'
						>
							<ReactTooltip id='distanceSlider'>
								{distance[0] + '\u00A0' + 'km'}
							</ReactTooltip>
						</div>
					)}
				/>
			</div>
			<div className='flex flex-row justify-between pt-4'>
				<label className=''>Min age</label>
				<label className=''>Max age</label>
			</div>
			<div className='pt-6 mx-2'>
				<Range
					allowOverlap={true}
					values={age}
					step={1}
					min={16}
					max={100}
					onChange={(values) => setAge(values)}
					onFinalChange={handleAge}
					renderTrack={({ props, children }) => (
						<div
							onMouseDown={props.onMouseDown}
							onTouchStart={props.onTouchStart}
							style={{
								...props.style,
								height: '14px',
								width: '100%',
								display: 'flex',
							}}
						>
							<div
								ref={props.ref}
								style={{
									height: '14px',
									width: '100%',
									borderRadius: '6px',
									background: getTrackBackground({
										values: age,
										colors: ['#ccc', '#548BF4', '#ccc'],
										min: 16,
										max: 100,
									}),
									alignSelf: 'center'
								}}
							>
								{children}
							</div>
						</div>
					)}
					renderThumb={({ index, props }) => (
						<div
							{...props}
							style={{
								...props.style,
								height: '25px',
								width: '25px',
								borderRadius: '50%',
								backgroundColor: '#fff',
								alignItems: 'center',
								boxShadow: '0px 2px 6px #AAA'
							}}
							className='focus:outline-none'
							data-tip
							data-for={`ageSlider${index}`}
						>
							<ReactTooltip id={`ageSlider${index}`}>
								{age[index]}
							</ReactTooltip>
						</div>
					)}
				/>
			</div>
			<div className='flex flex-row justify-between pt-4'>
				<label className=''>Min fame</label>
				<label className=''>Max fame</label>
			</div>
			<div className='pt-6 mx-2 pb-4'>
				<Range
					allowOverlap={true}
					values={fame}
					step={1}
					min={0}
					max={500}
					onChange={(values) => setFame(values)}
					onFinalChange={handleFame}
					renderTrack={({ props, children }) => (
						<div
							onMouseDown={props.onMouseDown}
							onTouchStart={props.onTouchStart}
							style={{
								...props.style,
								height: '14px',
								width: '100%',
								display: 'flex',
							}}
						>
							<div
								ref={props.ref}
								style={{
									height: '14px',
									width: '100%',
									borderRadius: '6px',
									background: getTrackBackground({
										values: fame,
										colors: ['#ccc', '#548BF4', '#ccc'],
										min: 0,
										max: 500,
									}),
									alignSelf: 'center'
								}}
							>
								{children}
							</div>
						</div>
					)}
					renderThumb={({ index, props }) => (
						<div
							{...props}
							style={{
								...props.style,
								height: '25px',
								width: '25px',
								borderRadius: '50%',
								backgroundColor: '#fff',
								alignItems: 'center',
								boxShadow: '0px 2px 6px #AAA'
							}}
							className='focus:outline-none'
							data-tip
							data-for={`fameSlider${index}`}
						>
							<ReactTooltip id={`fameSlider${index}`}>
								{fame[index] === 0 ? '0' : fame[index]}
							</ReactTooltip>
						</div>
					)}
				/>
			</div>
			<div
				className='justify-center flex pt-4'
				style={{
					width: '100%',
					color: '#fff',
					padding: '.75rem',
					marginTop: '.25rem',
				}}
			>
				<button
					className='rounded bg-green-500 hover:bg-green-600 text-white ml-2 p-2'
					onClick={handleReset}
				>
				Reset filters
				</button>
			</div>
		</div>
	)
}

export default SliderFilter