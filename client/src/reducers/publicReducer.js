import userService from '../services/users'
import tagsService from '../services/tags'
import { getDistance, convertDistance } from 'geolib'
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
	filterSliders: {
		distance: 500,
		age: [16, 100],
		fame: [0, 500],
	},
	loadingApp: true,
	loadingUsers: true,
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
	case 'SETSLIDERS':
		return {
			...state,
			filterSliders: action.data,
		}
	case 'RESETFILTERS':
		return {
			...state,
			filterSliders: initialState.filterSliders,
			filterTags: initialState.filterTags,
		}
	case 'SETSORT':
		return {
			...state,
			sortFilter: action.data.sortFilter,
		}
	case 'SETUSERS':
		return {
			...state,
			users: action.data,
		}
	case 'SETPREVIEWS':
		return {
			...state,
			previews: action.data,
		}
	case 'SETIDS':
		return {
			...state,
			ids: action.data,
		}
	case 'LOADINGAPP':
		return {
			...state,
			loadingApp: action.data,
		}
	case 'LOADINGUSERS':
		return {
			...state,
			loadingUsers: action.data,
		}
	case 'SETPROFILE':
		return {
			...state,
			profile: action.data,
		}
	default:
		return state
	}
}

export const getUsers = (filter, sliders, sort, tags, latitude, longitude) => {
	return async dispatch => {
		let data
		try {
			// console.log(sliders)
			data = await userService.getUsers()
			data.map(user => {
				user.orientation = parse.oFromDb(user.orientation)
				user.tags = parse.parseTags(user.tags)
			})
			// console.log(data)
			//filter by tags
			if (filter.length) {
				data = data.filter(user => filter.every(tag => user.tags.includes(tag)))
			}
			//filter by sliders
			if (sliders) {
				if (sliders.distance !== 1000) {
					data = data.filter(user => {
						user.distance = getDistance(
							{ latitude: user.latitude, longitude: user.longitude },
							{ latitude: latitude, longitude: longitude }
						)
						user.distance = Math.ceil(convertDistance(user.distance, 'km'))
						// console.log(user.distance, sliders.distance)
						return (
							(user.distance <= sliders.distance)
						)
					})
				}
				if (sliders.age) {
					data = data.filter(user => {
						return (
							(user.age >= sliders.age[0] && user.age <= sliders.age[1])
						)
					})
				}
				if (sliders.fame) {
					data = data.filter(user => {
						return (
							(user.fame >= sliders.fame[0] && user.fame <= sliders.fame[1])
						)
					})
				}
			}
			//sort
			if (sort === 'distance (ascending)') {
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
			} else if (sort === 'distance (descending)') {
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
						(b.distance - a.distance)
					)
				})
			} else if (sort === 'fame (ascending)') {
				data = data.sort((a,b) => {
					return a.fame - b.fame
				})
			} else if (sort === 'fame (descending)') {
				data = data.sort((a,b) => {
					return b.fame - a.fame
				})
			} else if (sort === 'age (ascending)') {
				data = data.sort((a,b) => {
					return a.age - b.age
				})
			} else if (sort === 'age (descending)') {
				data = data.sort((a,b) => {
					return b.age - a.age
				})
			} else if (sort === 'tags in common') {
				let matches = data.filter(user => tags.some(tag => user.tags.includes(tag)))
				// console.log(matches)
				matches = matches.sort((a,b) => {
					a.matches = a.tags.filter(tag => tags.some(v => tag.includes(v)))
					b.matches = b.tags.filter(tag => tags.some(v => tag.includes(v)))
					// console.log(a.matches, b.matches)
					return (
						(b.matches.length - a.matches.length)
					)
				})
				// console.log(matches)
				// console.log('len', data.length)
				data = data.filter(user => !matches.map(i => i.id).includes(user.id))
				data = matches.concat(data)
				// console.log(data)
			}
			console.log(data.length)
			dispatch({
				type: 'SETUSERS',
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
				type: 'SETPROFILE',
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
				type: 'SETIDS',
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