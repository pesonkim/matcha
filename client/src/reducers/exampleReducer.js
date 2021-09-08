import exampleService from '../services/example'

const exampleReducer = (state = [], action) => {
	switch (action.type) {
	case 'EXAMPLE':
		return action.data
	default:
		return state
	}
}

export const testReducer = () => {
	return async dispatch => {
		const data = await exampleService.example()
		console.log(data)
		dispatch({
			type: 'EXAMPLE',
			data
		})
	}
}

export default exampleReducer