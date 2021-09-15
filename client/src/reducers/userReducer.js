import loginService from '../services/login'
import userService from '../services/users'
import forgotService from '../services/forgot'
import axios from 'axios'
import parse from '../utils/parse'

const initialState = {
	id: null,
	username: null,
	email: null,
	token: null,
	loggedIn: false,
	userComplete: false,
	ip: null,
	latitude: null,
	longitude: null,
	age: null,
	gender: null,
	orientation: null,
	bio: null,
	tags: null,
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'LOGIN':
		return {
			...state,
			id: action.data.id,
			username: action.data.username,
			email: action.data.email,
			firstname: action.data.firstname,
			lastname: action.data.lastname,
			token: action.data.token,
			age: action.data.age,
			gender: action.data.gender,
			orientation: parse.oFromDb(action.data.orientation),
			bio: action.data.bio,
			tags: parse.parseTags(action.data.tags),
			loggedIn: true,
			userComplete: (action.data.gender && action.data.orientation ? true : false),
			latitude: action.data.latitude,
			longitude: action.data.longitude,
		}
	case 'LOGOUT':
		return initialState
	case 'LOOKUP':
		return {
			...state,
			ip: action.data.ip,
		}
	case 'PROFILE':
		return {
			...state,
			email: action.data.email,
			username: action.data.username,
			firstname: action.data.firstname,
			lastname: action.data.lastname,
			gender: action.data.gender,
			token: action.data.token,
			orientation: parse.oFromDb(action.data.orientation),
			bio: action.data.bio,
			tags: parse.parseTags(action.data.tags),
			userComplete: (action.data.gender && action.data.orientation ? true : false),
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
			//console.log(data)
			dispatch({
				type: 'LOGIN',
				data
			})
			dispatch({
				type: 'CLEAR',
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

export const update = (input, id) => {
	return async dispatch => {
		let data
		try {
			data = await userService.updateProfile(input, id)
			dispatch({
				type: 'PROFILE',
				data
			})
			dispatch({
				type: 'NOTIF',
				data: 'Profile updated'
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

export const lookup = () => {
	return async dispatch => {
		const coords = await axios.get('https://geolocation-db.com/json/')
		const data = {
			ip: coords.data.IPv4,
		}
		dispatch({
			type: 'LOOKUP',
			data
		})
	}
}

export default userReducer