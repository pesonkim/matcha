import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const SliderFilter = () => {
	const createSliderWithTooltip = Slider.createSliderWithTooltip
	const SliderWithTooltip = createSliderWithTooltip(Slider)
	const Range = createSliderWithTooltip(Slider.Range)
	const { filterSliders } = useSelector(state => state.public)
	const dispatch = useDispatch()

	const handleDistance = (v) => {
		// console.log('distance', v)
		dispatch({
			type: 'SETSLIDERS',
			data: {
				...filterSliders,
				distance: v,
			}
		})
	}

	const handleAge = (v) => {
		// console.log('age', v)
		dispatch({
			type: 'SETSLIDERS',
			data: {
				...filterSliders,
				age: v,
			}
		})
	}

	const handleFame = (v) => {
		// console.log('fame', v)
		dispatch({
			type: 'SETSLIDERS',
			data: {
				...filterSliders,
				fame: v,
			}
		})
	}

	return (
		<form className='mb-4 mx-2'>
			<label className=''>Distance difference</label>
			<SliderWithTooltip
				min={1}
				max={500}
				defaultValue={filterSliders ? filterSliders.distance : 500}
				onAfterChange={handleDistance}
				tipFormatter={(v) => v + '\u00A0' + 'km'}
				trackStyle={[{ height: 14 }]}
				handleStyle={[
					{
						height: 25,
						width: 25,
						// marginLeft: -10,
						// marginRight: -10,
					}
				]}
				railStyle={{ height: 14 }}
				className='mb-4'
			/>
			<div className='flex flex-row justify-between pt-4'>
				<label className=''>Min age</label>
				<label className=''>Max age</label>
			</div>
			<Range
				min={16}
				max={100}
				defaultValue={filterSliders ? [filterSliders.age[0], filterSliders.age[1]] : [16, 100]}
				onAfterChange={handleAge}
				trackStyle={[{ height: 14 }]}
				handleStyle={[
					{
						height: 25,
						width: 25,
						// marginLeft: 10,
					},
					{
						height: 25,
						width: 25,
						// marginLeft: -10,
					}
				]}
				railStyle={{ height: 14 }}
				className='mb-4'
			/>
			<div className='flex flex-row justify-between pt-4'>
				<label className=''>Min fame</label>
				<label className=''>Max fame</label>
			</div>
			<Range
				min={0}
				max={500}
				defaultValue={filterSliders ? [filterSliders.fame[0], filterSliders.fame[1]] : [0, 500]}
				onAfterChange={handleFame}
				trackStyle={[{ height: 14 }]}
				handleStyle={[
					{
						height: 25,
						width: 25,
						// marginLeft: 10,
					},
					{
						height: 25,
						width: 25,
						// marginLeft: -10,
					}
				]}
				railStyle={{ height: 14 }}
				className='mb-4'
			/>
		</form>
	)
}

export default SliderFilter