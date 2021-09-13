import loginService from '../services/login'
import userService from '../services/users'
import forgotService from '../services/forgot'
import axios from 'axios'
import parse from '../utils/parse'

const initialState = {
	id: null,
	username: null,
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
			firstname: action.data.firstname,
			lastname: action.data.lastname,
			token: action.data.token,
			age: action.data.age,
			gender: action.data.gender,
			orientation: action.data.orientation,
			bio: action.data.bio,
			tags: parse.parseTags(action.data.tags),
			loggedIn: true,
			userComplete: (action.data.gender && action.data.orientation ? true : false)
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
	case 'GENDER':
		return {
			...state,
			gender: action.data.gender,
		}
	case 'ORIENTATION':
		return {
			...state,
			orientation: action.data.orientation,
		}
	case 'BIO':
		return {
			...state,
			bio: action.data.bio,
		}
	case 'TAGS':
		return {
			...state,
			tags: action.data.tags,
		}
	case 'PROFILE':
		return {
			...state,
			username: action.data.username,
			firstname: action.data.firstname,
			lastname: action.data.lastname,
			gender: action.data.gender,
			orientation: action.data.orientation,
			bio: action.data.bio,
			tags: parse.parseTags(action.data.tags),
			userComplete: (action.data.gender && action.data.orientation ? true : false)
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