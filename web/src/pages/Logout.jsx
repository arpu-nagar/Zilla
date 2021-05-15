import React from 'react';
import { Redirect } from 'react-router';
import { logout } from '../infrastructure/api';

function Logout() {
	const [state, setState] = React.useState(true);
	React.useEffect(() => {
		setState(true);
		logout();
		setState(false);
	}, []);
	if (state) return <div>Loading....</div>;
	return <Redirect to="/login" />;
}

export default Logout;
