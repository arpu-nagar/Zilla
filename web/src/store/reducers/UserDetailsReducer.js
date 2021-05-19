import { SET_USER_DATA } from '../constants';

const initialState = {
	email: '',
	name: '',
	organisationName: '',
	organisationDescription: '',
	// members: [],
};

export default function UserDetailReducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER_DATA:
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
