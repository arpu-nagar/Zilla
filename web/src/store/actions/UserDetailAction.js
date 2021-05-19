import { secApiCall } from '../../infrastructure/api';
import { SET_USER_DATA } from '../constants';

function setUserDetails(results) {
	return {
		type: SET_USER_DATA,
		payload: results,
	};
}

export function setUserDetailsAction() {
	return async function (dispatch) {
		const data = await secApiCall('user/getUserData', {}, 'POST');
		dispatch(setUserDetails(data.data));
	};
}
