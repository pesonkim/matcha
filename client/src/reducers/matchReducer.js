import viewService from '../services/views'
import likeService from '../services/likes'
import reportService from '../services/reports'
import blockService from '../services/blocks'
import messageService from '../services/messages'
import notifService from '../services/notifications'
import userService from '../services/users'

const initialState = {
	views: [],
	likes: [],
	reports: [],
	blocks: [],
	log: [],
}

const matchReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'SETVIEWS':
		return {
			...state,
			views: action.data
		}
	case 'SETLIKES':
		return {
			...state,
			likes: action.data
		}
	case 'SETREPORTS':
		return {
			...state,
			reports: action.data
		}
	case 'SETBLOCKS':
		return {
			...state,
			blocks: action.data
		}
	case 'SETLOG':
		return {
			...state,
			log: action.data
		}
	default:
		return state
	}
}

export const getHistory = () => {
	return async dispatch => {
		let data
		try {
			data = await viewService.getViews()
			dispatch({
				type: 'SETVIEWS',
				data
			})
			data = await likeService.getLikes()
			dispatch({
				type: 'SETLIKES',
				data
			})
			data = await reportService.getReports()
			dispatch({
				type: 'SETREPORTS',
				data
			})
			data = await blockService.getBlocks()
			dispatch({
				type: 'SETBLOCKS',
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

export const getLog = (views, likes, reports) => {
	return async dispatch => {
		let log
		let data
		try {
			data = await userService.getUsers()
			log = views.map(v => ({ type: 'Viewed', target: data.find(user => user.id === v.receiver), date: v.created_at }))
			log = log.concat(likes.map(v => ({ type: 'Liked', target: data.find(user => user.id === v.receiver), date: v.created_at })))
			log = log.concat(reports.map(v => ({ type: 'Reported', target: data.find(user => user.id === v.receiver), date: v.created_at })))
			// console.log(log)
			log = log.sort((a,b) => (new Date(b.date) - new Date(a.date)))
			log = log.filter(i => typeof i.target === 'object' && i.target !== null)
			// console.log(log)
			dispatch({
				type: 'SETLOG',
				data: log
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

export const profileView = (view) => {
	return async dispatch => {
		let data
		try {
			// console.log(`${view.from} viewed user ${view.to}`)
			await viewService.addView(view)
			data = await viewService.getViews()
			dispatch({
				type: 'SETVIEWS',
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
			await likeService.addLike(like)
			data = await likeService.getLikes()
			dispatch({
				type: 'SETLIKES',
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
			await reportService.addReport(report)
			data = await reportService.getReports()
			dispatch({
				type: 'SETREPORTS',
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
			if (block.type === 'new') {
				await blockService.addBlock(block)
			} else if (block.type === 'remove') {
				await blockService.removeBlock(block.id)
			}
			data = await blockService.getBlocks()
			dispatch({
				type: 'SETBLOCKS',
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