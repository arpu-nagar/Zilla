import {
	CHANGE_VIEW_BACKLOG,
	CHANGE_VIEW_BUGS,
	CHANGE_VIEW_HOME,
	CHANGE_VIEW_TASKS,
} from '../constants';

const initState = {
	page: 'Home',
};

export default function PageReducer(state = initState, action) {
	switch (action.type) {
		case CHANGE_VIEW_HOME:
			return { ...state, page: 'Home' };
		case CHANGE_VIEW_TASKS:
			return { ...state, page: 'Tasks' };
		case CHANGE_VIEW_BACKLOG:
			return { ...state, page: 'Backlogs' };
		case CHANGE_VIEW_BUGS:
			return { ...state, page: 'Bugs' };
		default:
			return state;
	}
}
