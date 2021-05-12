import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import Logout from './Logout';
import ProtectedRoute from './ProtectedRoute';
import RegisterPage from './Register/RegisterPage';
import ResetPassword from './ResetPassword/ResetPassword';
import SetPassword from './ResetPassword/SetPassword';

function ZillaDriver() {
	return (
		<>
			<Router>
				<Switch>
					<Route
						exact
						path="/reset-password"
						component={props => <ResetPassword {...props} />}
					/>
					<Route
						path="/register"
						component={props => <RegisterPage {...props} />}
					/>
					<Route
						path="/login"
						component={props => <Login {...props} />}
					/>
					<Route
						path="/reset-password/:id"
						component={props => <SetPassword {...props} />}
					/>
					<Route
						path="/logout"
						component={props => <Logout {...props} />}
					/>
					<ProtectedRoute
						path="/"
						component={props => <Home {...props} />}
					/>
				</Switch>
			</Router>
		</>
	);
}

export default ZillaDriver;
