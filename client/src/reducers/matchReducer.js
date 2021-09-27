const initialState = {
	likes: [],
	reports: [],
	blocks: [],
}

const matchReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'DEFAULT':
		return {
			...state,
			// allTags: parse.parseTags(action.data),
		}
	default:
		return state
	}
}

// export const updateTags = (newTags) => {
// 	return async dispatch => {
// 		let data
// 		try {
// 			data = await tagsService.getTags()

// 			const currentTags = parse.parseTags(data)
// 			const filteredTags = Array.from(new Set(currentTags.concat(newTags)))
// 			const updateStr = filteredTags ? filteredTags.map(t => t).join('') : ''

// 			await tagsService.addTags({ tags: updateStr })
// 			data = await tagsService.getTags()
// 			//console.log(data)
// 			dispatch({
// 				type: 'SETTAGS',
// 				data
// 			})
// 		} catch (error) {
// 			if (error.response && error.response.data) {
// 				data = error.response.data.error
// 			} else {
// 				data = 'Database error'
// 			}
// 			dispatch({
// 				type: 'ERROR',
// 				data,
// 			})
// 		}
// 	}
// }

export default matchReducer