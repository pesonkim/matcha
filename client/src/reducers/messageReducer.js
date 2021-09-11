const initialState = {
	notification: '',
	errorMessage: '',
}

const messageReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'NOTIF':
		return {
			...initialState,
			notification: action.data
		}
	case 'ERROR':
		return {
			...initialState,
			errorMessage: action.data
		}
	case 'CLEAR':
		return initialState
	default:
		return state
	}
}

export const setNotif = (message) => {
	return dispatch => {
		dispatch({
			type: 'NOTIF',
			data: message,
		})
	}
}

export const setError = (message) => {
	return dispatch => {
		dispatch({
			type: 'ERROR',
			data: message,
		})
	}
}

export const clear = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR'
		})
	}
}

export default messageReducer