import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import exampleReducer from './reducers/exampleReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
	example: exampleReducer,
	user: userReducer
})

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

export default store