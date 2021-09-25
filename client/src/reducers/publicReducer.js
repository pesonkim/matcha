import userService from '../services/users'
import tagsService from '../services/tags'
import { getDistance } from 'geolib'
import axios from 'axios'
import parse from '../utils/parse'

const initialState = {
	ids: [],
	users: [],
	previews: [],
	profile: null,
	sortFilter: null,
	allTags: null,
	filterTags: [],
	loading: true,
}

const publicReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'SETTAGS':
		return {
			...state,
			allTags: parse.parseTags(action.data),
		}
	case 'SETFILTERTAGS':
		return {
			...state,
			filterTags: action.data,
		}
	case 'SETSORT':
		return {
			...state,
			sortFilter: action.data.sortFilter,
		}
	case 'GETUSERS':
		return {
			...state,
			users: action.data,
		}
	case 'GETPREVIEWS':
		return {
			...state,
			previews: action.data,
		}
	case 'GETIDS':
		return {
			...state,
			ids: action.data,
		}
	case 'SETLOADING':
		return {
			...state,
			loading: false,
		}
	case 'GETPROFILE':
		return {
			...state,
			profile: action.data,
		}
	default:
		return state
	}
}

export const getUsers = (sort, latitude, longitude) => {
	return async dispatch => {
		let data
		try {
			data = await userService.getUsers()
			data.map(user => {
				user.orientation = parse.oFromDb(user.orientation)
				user.tags = parse.parseTags(user.tags)
			})
			//sort here
			if (sort === 'distance') {
				data = data.sort((a,b) => {
					a.distance = getDistance(
						{ latitude: a.latitude, longitude: a.longitude },
						{ latitude: latitude, longitude: longitude }
					)
					b.distance = getDistance(
						{ latitude: b.latitude, longitude: b.longitude },
						{ latitude: latitude, longitude: longitude }
					)
					return (
						(a.distance - b.distance)
					)
				})
			} else if (sort === 'fame') {
				data = data.sort((a,b) => {
					return b.fame - a.fame
				})
			} else if (sort === 'age (from young to old)') {
				data = data.sort((a,b) => {
					return a.age - b.age
				})
			} else if (sort === 'age (from old to young)') {
				data = data.sort((a,b) => {
					return b.age - a.age
				})
			}
			// console.log(data)
			dispatch({
				type: 'GETUSERS',
				data
			})
			dispatch({
				type: 'GETPREVIEWS',
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

export const getUserById = (id) => {
	return async dispatch => {
		let data
		try {
			data = await userService.getUsers()
			data = data.find(user => user.id === id)
			data.orientation = parse.oFromDb(data.orientation)
			data.tags = parse.parseTags(data.tags)
			console.log(data)
			dispatch({
				type: 'GETPROFILE',
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

export const getUserIds = () => {
	return async dispatch => {
		let data
		let ids = []
		try {
			data = await userService.getUsers()
			data.map(user => ids.push(user.id))
			console.log(ids)
			dispatch({
				type: 'GETIDS',
				data: ids
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

export const getTags = () => {
	return async dispatch => {
		let data
		try {
			data = await tagsService.getTags()
			//console.log(data)
			dispatch({
				type: 'SETTAGS',
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

export const updateTags = (newTags) => {
	return async dispatch => {
		let data
		try {
			data = await tagsService.getTags()

			const currentTags = parse.parseTags(data)
			const filteredTags = Array.from(new Set(currentTags.concat(newTags)))
			const updateStr = filteredTags ? filteredTags.map(t => t).join('') : ''

			await tagsService.addTags({ tags: updateStr })
			data = await tagsService.getTags()
			//console.log(data)
			dispatch({
				type: 'SETTAGS',
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

export default publicReducer