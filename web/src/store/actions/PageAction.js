import {
	CHANGE_VIEW_BACKLOG,
	CHANGE_VIEW_BUGS,
	CHANGE_VIEW_HOME,
	CHANGE_VIEW_TASKS,
} from '../constants';

export function setHome(payload) {
	return {
		type: CHANGE_VIEW_HOME,
		payload,
	};
}

export function setBugs(payload) {
	return {
		type: CHANGE_VIEW_BUGS,
		payload,
	};
}

export function setTasks(payload) {
	return {
		type: CHANGE_VIEW_TASKS,
		payload,
	};
}

export function setBacklog(payload) {
	return {
		type: CHANGE_VIEW_BACKLOG,
		payload,
	};
}
