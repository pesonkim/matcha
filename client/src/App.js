import { Route, Switch } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { locate } from './reducers/userReducer'
import auth from './utils/auth'

import LoginPage from './components/pages/Login'
import SignupPage from './components/pages/Signup'
import VerifyPage from './components/pages/Verify'
import ForgotPage from './components/pages/Forgot'
import BrowsePage from './components/pages/Browse'
import ResetPage from './components/pages/Reset'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		const user = JSON.parse(window.localStorage.getItem('user'))

		if (user) {
			dispatch({
				type: 'LOGIN',
				data: user
			})
			auth.setToken(user.token)
		} else {
			window.localStorage.clear()
		}
		dispatch(locate())
	}, [dispatch])

	const { loggedIn } = useSelector(state => state.user)

	return (
		<Layout>
			<Switch>
				<Route path='/browse' render={() => loggedIn
					? <BrowsePage />
					: <Redirect to='/' />
				} />
				<Route path='/login' render={() => !loggedIn
					? <LoginPage />
					: <Redirect to='/' />
				} />
				<Route path='/verify' render={() => !loggedIn
					? <VerifyPage />
					: <Redirect to='/' />
				} />
				<Route path='/signup' render={() => !loggedIn
					? <SignupPage />
					: <Redirect to='/' />
				} />
				<Route path='/forgot' render={() => !loggedIn
					? <ForgotPage />
					: <Redirect to='/' />
				} />
				<Route path='/reset/:token' render={() => !loggedIn
					? <ResetPage />
					: <Redirect to='/' />
				} />
				<Route path='/profile' render={() => loggedIn
					? <BrowsePage />
					: <Redirect to='/' />
				} />
				<Route path='/matches' render={() => loggedIn
					? <BrowsePage />
					: <Redirect to='/' />
				} />
				<Route path='/notif' render={() => loggedIn
					? <BrowsePage />
					: <Redirect to='/' />
				} />
				<Route path='/' render={() => loggedIn
					? <Redirect to='/browse' />
					: <Redirect to='/login' />
				} />
			</Switch>
		</Layout>
	)
}

export default App
