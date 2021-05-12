import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { access_token } from '../infrastructure/api';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	if (access_token === null) return <Redirect to="/login" />;
	return (
		<Route {...rest} render={props => <Component {...rest} {...props} />} />
	);
};

export default ProtectedRoute;
