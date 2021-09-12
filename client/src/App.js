import { Route, Switch } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { locate } from './reducers/userReducer'

import LoginPage from './components/pages/Login'
import SignupPage from './components/pages/Signup'
import VerifyPage from './components/pages/Verify'
import ForgotPage from './components/pages/Forgot'
import BrowsePage from './components/pages/Browse'
import ResetPage from './components/pages/Reset'

const App = () => {
	const { loggedIn } = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(locate())
		if (!loggedIn) {
			window.localStorage.clear()
		}
	}, [dispatch])

	return (
		<Layout>
			<Switch>
				<Route path='/login' component={LoginPage} />
				<Route path='/verify' component={VerifyPage}/>
				<Route path='/signup' component={SignupPage} />
				<Route path='/forgot' component={ForgotPage} />
				<Route path='/reset/:token' component={ResetPage} />
				<Route path='/browse' component={BrowsePage} />
				<Route path='/' render={() => {
					return !loggedIn ? <Redirect to='/login' /> : <div>home page here</div>
				}} />
			</Switch>
		</Layout>
	)
}

export default App
