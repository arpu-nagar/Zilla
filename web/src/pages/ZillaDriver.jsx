import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
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
				</Switch>
			</Router>
		</>
	);
}

export default ZillaDriver;
