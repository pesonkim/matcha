import loginService from '../services/login'

const initialState = {
	id: null,
	username: null,
	token: null,
	loggedIn: false,
	errorMessage: '',
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'LOGIN':
		return {
			id: action.data.id,
			username: action.data.username,
			token: action.data.token,
			loggedIn: true
		}
	case 'LOGOUT':
		return initialState
	case 'ERROR':
		return {
			...state,
			errorMessage: action.data
		}
	default:
		return state
	}
}

export const login = (credentials) => {
	return async dispatch => {
		let data
		try {
			data = await loginService.login(credentials)
			dispatch({
				type: 'LOGIN',
				data
			})
		} catch (error) {
			if (error.response && error.response.data) {
				data = error.response.data.error
			} else {
				data = 'Database error'
			}
			dispatch({
				type: 'ERROR',
				data,
			})
		}
	}
}

export default userReducer