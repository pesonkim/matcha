import { Route, Switch } from 'react-router-dom'
import Layout from './components/layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { lookup } from './reducers/userReducer'
import { getUsers } from './reducers/publicReducer'
import auth from './utils/auth'

import LoginPage from './components/pages/Login'
import SignupPage from './components/pages/Signup'
import ForgotPage from './components/pages/Forgot'
import BrowsePage from './components/pages/Browse'
import PublicProfile from './components/pages/PublicProfile'
import ResetPage from './components/pages/Reset'
import ProfilePage from './components/pages/Profile'
import ProfileForm from './components/ui/forms/ProfileForm'

import Chat from './components/pages/Chat'
import Join from './components/pages/Join'

const App = () => {
	const { loggedIn, userComplete } = useSelector(state => state.user)
	const { errorMessage } = useSelector(state => state.form)
	const { users } = useSelector(state => state.public)
	const { orientation } = useSelector(state => state.user)
	const dispatch = useDispatch()
	const loading = useRef(true)

	useEffect(() => {
		const user = JSON.parse(window.localStorage.getItem('user'))

		if (user) {
			auth.setToken(user.token)
			dispatch({
				type: 'LOGIN',
				data: user
			})
		} else {
			window.localStorage.clear()
			loading.current = false
		}
		dispatch(lookup())
		console.log(auth.config())
	}, [dispatch])

	useEffect(() => {
		if (errorMessage === 'token expired') {
			window.localStorage.clear()
			window.location.href = '/expired'
		}
	}, [errorMessage])

	useEffect(() => {
		if (userComplete) {
			dispatch(getUsers())
			loading.current = false
		}
	}, [loggedIn, orientation])

	//console.log(loggedIn, userComplete)

	return (
		<Layout>
			{loading.current
				? <p>Loading</p>
				: <Switch>
					<Route path='/browse/:id' render={({ match }) => {
						const id = parseInt(match.params.id)
						const foundUser = users.find(user => user.id === id)
						return (
							loggedIn
								? userComplete
									? foundUser
										? <PublicProfile user={foundUser} />
										: <Redirect to='/browse' />
									: <ProfileForm />
								: <Redirect to='/' />
						)
					}} />
					<Route path='/browse' render={() => loggedIn
						? userComplete
							? <BrowsePage />
							: <ProfileForm />
						: <Redirect to='/' />
					} />
					<Route path='/chat' component={Chat} />
					<Route path='/join' component={Join} />
					<Route path='/login' render={() => !loggedIn
						? <LoginPage />
						: <Redirect to='/' />
					} />
					<Route path='/verify' render={() => !loggedIn
						? <LoginPage />
						: <Redirect to='/' />
					} />
					<Route path='/expired' render={() => !loggedIn
						? <LoginPage />
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
					<Route path='/profile' render={() => loggedIn && userComplete
						? <ProfilePage />
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
			}
		</Layout>
	)
}

export default App
