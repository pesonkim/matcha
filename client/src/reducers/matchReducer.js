import viewService from '../services/views'
import likeService from '../services/likes'
import reportService from '../services/reports'
import blockService from '../services/blocks'
import matchService from '../services/matches'
import messageService from '../services/messages'
import notifService from '../services/notifications'
import userService from '../services/users'
import parse from '../utils/parse'

import io from 'socket.io-client'
const endpoint = process.env.REACT_APP_ENDPOINT
const socket = io(endpoint)

const initialState = {
	likes: [],
	reports: [],
	blocks: null,
	log: [],
	notif: [],
	matches: [],
}

const matchReducer = (state = initialState, action) => {
	switch (action.type) {
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
	case 'SETNOTIF':
		return {
			...state,
			notif: action.data
		}
	case 'SETMATCHES':
		return {
			...state,
			matches: action.data
		}
	default:
		return state
	}
}

export const getHistory = () => {
	return async dispatch => {
		let data
		try {
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

export const getLikes = () => {
	return async dispatch => {
		let data
		try {
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

export const getMatches = () => {
	return async dispatch => {
		let data
		try {
			data = await matchService.getMatches()
			data.map(i => {
				i.orientation = parse.oFromDb(i.orientation)
				i.tags = parse.parseTags(i.tags)
			})
			// console.log(data)
			const blocks = await blockService.getBlocks()
			// console.log('blocks', blocks)
			if (blocks && blocks.length) {
				data = data.filter(i => !blocks.map(b => b.receiver).includes(i.id))
			}
			// console.log(data)
			const chat = await messageService.getMessages()
			data.map(i => {
				i.chat = chat.filter(m => m.sender === i.id || m.receiver === i.id)
			})
			// console.log(data)
			data = data.sort((a,b) => {
				a.latest = a.chat.length ? a.chat[a.chat.length - 1].created_at : a.created_at
				b.latest = b.chat.length ? b.chat[b.chat.length - 1].created_at : b.created_at
				return (
					new Date(b.latest) - new Date(a.latest)
				)
			})
			// console.log(data)
			dispatch({
				type: 'SETMATCHES',
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

export const getNotif = (id) => {
	return async dispatch => {
		let data
		try {
			data = await notifService.getNotif()
			const blocks = await blockService.getBlocks()
			if (blocks && blocks.length) {
				data = data.filter(i => !blocks.map(b => b.receiver).includes(i.sender))
			}
			data = data.filter(i => i.receiver === id)
			data = data.filter(i => i.action === 'view' || i.action === 'like' || i.action === 'unlike' )
			data = data.reverse()
			// console.log(data)
			dispatch({
				type: 'SETNOTIF',
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

export const getLog = (id) => {
	return async dispatch => {
		let data
		try {
			data = await notifService.getNotif()
			// console.log('before',data)
			// console.log(id)
			data = data.filter(i => i.sender === id)
			data.map(i => {
				switch(i.action) {
				case 'view':
					return i.action = 'Viewed'
				case 'like':
					return i.action = 'Liked'
				case 'unlike':
					return i.action = 'Unliked'
				case 'report':
					return i.action = 'Reported'
				case 'block':
					return i.action = 'Blocked'
				case 'unblock':
					return i.action = 'Unblocked'
				}
			})
			data = data.reverse()
			// console.log('here',data)
			dispatch({
				type: 'SETLOG',
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

export const profileView = (view) => {
	return async dispatch => {
		let data
		try {
			// console.log(`${view.from} viewed user ${view.to}`)
			await viewService.addView(view)
			await notifService.addNotif({ action: 'view', sender: view.from, receiver: view.to })
			socket.emit('sendNotification', { action: 'view', sender: view.from, receiver: view.to }, (error) => {
				if (error) {
					console.log(error)
				}
			})
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
			if (like.type === 'new') {
				await likeService.addLike(like)
				await notifService.addNotif({ action: 'like', sender: like.from, receiver: like.to })
				socket.emit('sendNotification', { action: 'like', sender: like.from, receiver: like.to }, (error) => {
					if (error) {
						console.log(error)
					}
				})
			} else if (like.type === 'remove') {
				await likeService.removeLike(like)
				await notifService.addNotif({ action: 'unlike', sender: like.from, receiver: like.to })
				socket.emit('sendNotification', { action: 'unlike', sender: like.from, receiver: like.to }, (error) => {
					if (error) {
						console.log(error)
					}
				})
			}
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
			await notifService.addNotif({ action: 'report', sender: report.from, receiver: report.to })
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
			// console.log(block)
			if (block.type === 'new') {
				await blockService.addBlock(block)
				await notifService.addNotif({ action: 'block', sender: block.from, receiver: block.to })
			} else if (block.type === 'remove') {
				await blockService.removeBlock(block)
				await notifService.addNotif({ action: 'unblock', sender: block.from, receiver: block.to })
			}
			data = await blockService.getBlocks()
			dispatch({
				type: 'SETBLOCKS',
				data
			})
			const likes = await likeService.getLikes()
			const isLiked = likes.find(i => i.receiver === block.to)
			if (isLiked) {
				await dispatch(profileLike({ from: isLiked.sender, to: isLiked.receiver, type: 'remove', id: isLiked.id }))
			}
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

export const chatMessage = (message) => {
	return async dispatch => {
		let data
		try {
			// console.log(message.type, message)
			if (message.type === 'new') {
				await messageService.addMessage(message)
				socket.emit('sendMessage', { message }, (error) => {
					if (error) {
						console.log(error)
					}
				})
			} else if (message.type === 'read') {
				await messageService.updateMessages(message)
			}
			dispatch(getMatches())
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

export const readNotif = (notif, id) => {
	return async dispatch => {
		let data
		try {
			// console.log(notif, id)
			await notifService.updateNotif(notif, id)
			await dispatch(getNotif(id))
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