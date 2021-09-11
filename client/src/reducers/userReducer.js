import loginService from '../services/login'
import forgotService from '../services/forgot'

const initialState = {
	id: null,
	username: null,
	token: null,
	loggedIn: false,
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

export const forgot = (email) => {
	return async dispatch => {
		let data
		try {
			data = await forgotService.forgot(email)
			dispatch({
				type: 'NOTIF',
				data: data.message
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

export const reset = (password) => {
	return async dispatch => {
		let data
		try {
			data = await forgotService.reset(password)
			dispatch({
				type: 'NOTIF',
				data: data.message
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