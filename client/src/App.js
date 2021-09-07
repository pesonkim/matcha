import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from './components/Layout'

const App = () => {
	return (
		<Router>
			<Layout>
				<Switch>
					<Route path='/' exact render={() => (<div>home</div>)} />
					<Route path='/login' render={() => (<div>login</div>)} />
					<Route path='/signup' render={() => (<div>signup</div>)} />
				</Switch>
			</Layout>
		</Router>
	)
}

export default App
