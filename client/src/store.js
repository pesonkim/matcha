import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import formReducer from './reducers/formReducer'
import userReducer from './reducers/userReducer'
import publicReducer from './reducers/publicReducer'
import matchReducer from './reducers/matchReducer'

const reducer = combineReducers({
	form: formReducer,
	user: userReducer,
	public: publicReducer,
	match: matchReducer,
})

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

export default store