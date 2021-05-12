import React from 'react';
import { Redirect } from 'react-router';
import { logout } from '../infrastructure/api';

function Logout() {
	React.useEffect(() => {
		logout();
	}, []);
	return <Redirect to="/login" />;
}

export default Logout;
