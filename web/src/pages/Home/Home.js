import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserDetailsAction } from '../../store/actions/UserDetailAction';

function Home(props) {
	const { dispatch } = props;
	useEffect(() => {
		dispatch(setUserDetailsAction());
	}, [dispatch]);
	console.log(props);
	return <div>Welcome!</div>;
}

const mapStateToProps = state => ({
	details: state.UserDetailsReducer,
});

export default connect(mapStateToProps)(Home);
