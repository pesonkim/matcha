import viewService from '../services/views'
import likeService from '../services/likes'
import reportService from '../services/reports'
import blockService from '../services/blocks'
import messageService from '../services/messages'
import notifService from '../services/notifications'

const initialState = {
	likes: [],
	reports: [],
	blocks: [],
}

const matchReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'VIEWTEST':
		return {
			...state,
		}
	case 'LIKETEST':
		return {
			...state,
		}
	case 'REPORTTEST':
		return {
			...state,
		}
	case 'BLOCKTEST':
		return {
			...state,
		}
	default:
		return state
	}
}

export const profileView = (view) => {
	return async dispatch => {
		let data
		try {
			console.log(`${view.from} viewed user ${view.to}`)
			data = await viewService.addView(view)
			// data = await tagsService.getTags()

			// const currentTags = parse.parseTags(data)
			// const filteredTags = Array.from(new Set(currentTags.concat(newTags)))
			// const updateStr = filteredTags ? filteredTags.map(t => t).join('') : ''

			// await tagsService.addTags({ tags: updateStr })
			// data = await tagsService.getTags()
			//console.log(data)
			dispatch({
				type: 'VIEWTEST',
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

export const profileLike = (like) => {
	return async dispatch => {
		let data
		try {
			console.log(`${like.from} liked user ${like.to}`)
			data = await likeService.addLike(like)
			// data = await tagsService.getTags()

			// const currentTags = parse.parseTags(data)
			// const filteredTags = Array.from(new Set(currentTags.concat(newTags)))
			// const updateStr = filteredTags ? filteredTags.map(t => t).join('') : ''

			// await tagsService.addTags({ tags: updateStr })
			// data = await tagsService.getTags()
			//console.log(data)
			dispatch({
				type: 'LIKETEST',
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

export const profileReport = (report) => {
	return async dispatch => {
		let data
		try {
			console.log(`${report.from} reported user ${report.to}`)
			data = await reportService.addReport(report)
			// data = await tagsService.getTags()

			// const currentTags = parse.parseTags(data)
			// const filteredTags = Array.from(new Set(currentTags.concat(newTags)))
			// const updateStr = filteredTags ? filteredTags.map(t => t).join('') : ''

			// await tagsService.addTags({ tags: updateStr })
			// data = await tagsService.getTags()
			//console.log(data)
			dispatch({
				type: 'REPORTTEST',
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

export const profileBlock = (block) => {
	return async dispatch => {
		let data
		try {
			console.log(`${block.from} blocked user ${block.to}`)
			data = await blockService.addBlock(block)
			// data = await tagsService.getTags()

			// const currentTags = parse.parseTags(data)
			// const filteredTags = Array.from(new Set(currentTags.concat(newTags)))
			// const updateStr = filteredTags ? filteredTags.map(t => t).join('') : ''

			// await tagsService.addTags({ tags: updateStr })
			// data = await tagsService.getTags()
			//console.log(data)
			dispatch({
				type: 'BLOCKTEST',
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

export default matchReducer