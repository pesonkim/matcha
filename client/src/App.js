import { Route, Switch } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { testReducer } from './reducers/exampleReducer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import Wrapper from './components/ui/Wrapper'
import LoginPage from './components/pages/Login'
import SignupPage from './components/pages/Signup'
import ResetPage from './components/pages/Reset'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(testReducer())
	}, [dispatch])

	return (
		<Layout>
			<Switch>
				<Route path='/' exact render={() => (<Wrapper>home</Wrapper>)} />
				<Route path='/login' component={LoginPage} />
				<Route path='/signup' component={SignupPage} />
				<Route path='/reset' component={ResetPage} />
			</Switch>
		</Layout>
	)
}

export default App
