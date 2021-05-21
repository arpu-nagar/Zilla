import { combineReducers } from 'redux';
import UserDetailsReducer from './UserDetailsReducer';
import PageReducer from './PageReducer';
export default combineReducers({
	UserDetailsReducer,
	PageReducer,
});
