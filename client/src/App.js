import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from "./components/Layout";

const App = () => {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
