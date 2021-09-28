import userService from '../services/users'
import parse from '../utils/parse'
import photosService from '../services/photos'

const initialState = {
	notification: '',
	errorMessage: '',
	id: null,
	email: null,
	username: null,
	latitude: null,
	longitude: null,
	age: null,
	gender: null,
	orientation: null,
	bio: null,
	tags: null,
	photoStr: null,
}

const formReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'POPULATE':
		return {
			...initialState,
			email: action.data.email,
			username: action.data.username,
			firstname: action.data.firstname,
			lastname: action.data.lastname,
			gender: action.data.gender,
			orientation: parse.oFromDb(action.data.orientation),
			bio: action.data.bio,
			tags: parse.parseTags(action.data.tags),
			photoStr: action.data.avatar,
		}
	case 'PREVIEW':
		return {
			...state,
			photoStr: action.data,
		}
	case 'PHOTO':
		return {
			...state,
			photoStr: action.data.blob,
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
	case 'NOTIF':
		return {
			...state,
			notification: action.data,
			errorMessage: ''
		}
	case 'ERROR':
		return {
			...state,
			errorMessage: action.data,
			notification: '',
		}
	case 'CLEAR':
		return {
			...state,
			errorMessage: '',
			notification: '',
		}
	default:
		return state
	}
}

export const populate = (id) => {
	return async dispatch => {
		let data
		try {
			data = await userService.getProfile(id)
			//console.log(data)
			dispatch({
				type: 'POPULATE',
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

export const avatar = (blob) => {
	return async dispatch => {
		let data
		try {
			//console.log(blob)
			data = await photosService.addPhoto(blob)
			//console.log(data)
			const user = JSON.parse(window.localStorage.getItem('user'))
			window.localStorage.setItem('user', JSON.stringify({ ...user, avatar: data.blob }))
			dispatch({
				type: 'PHOTO',
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

export default formReducer