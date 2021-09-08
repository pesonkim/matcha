import { Route, Switch } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { testReducer } from './reducers/exampleReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(testReducer())
	}, [dispatch])

	return (
		<Layout>
			<Switch>
				<Route path='/' exact render={() => (<div>home</div>)} />
				<Route path='/login' render={() => (<div>login</div>)} />
				<Route path='/signup' render={() => (<div>signup</div>)} />
			</Switch>
		</Layout>
	)
}

export default App
