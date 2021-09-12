import loginService from '../services/login'
import forgotService from '../services/forgot'
import axios from 'axios'

const initialState = {
	id: null,
	username: null,
	token: null,
	loggedIn: false,
	ip: null,
	latitude: null,
	longitude: null,
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'LOGIN':
		return {
			...state,
			id: action.data.id,
			username: action.data.username,
			token: action.data.token,
			loggedIn: true
		}
	case 'LOGOUT':
		return initialState
	case 'LOCATE':
		return {
			...state,
			ip: action.data.ip,
			latitude: action.data.latitude,
			longitude: action.data.longitude,
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

export const locate = () => {
	return async dispatch => {
		const coords = await axios.get('https://geolocation-db.com/json/')
		const data = {
			ip: coords.data.IPv4,
			latitude: coords.data.latitude,
			longitude: coords.data.longitude
		}
		console.log(data)
		dispatch({
			type: 'LOCATE',
			data
		})
	}
}

export default userReducer