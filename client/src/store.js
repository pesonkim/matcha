import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
	message: messageReducer,
	user: userReducer
})

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

export default store