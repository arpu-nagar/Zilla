import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BottomNav from '../../components/BottomNav';
import NavBar from '../../components/NavBar';
import { setUserDetailsAction } from '../../store/actions/UserDetailAction';

const useStyle = makeStyles(theme => ({
	root: {
		width: '100%',
		height: '100vh',
		display: 'flex',
		flexDirection: 'column',
	},
	bottomNav: {
		marginTop: 'auto',
	},
}));

function Home(props) {
	const { dispatch } = props;
	const classes = useStyle();
	useEffect(() => {
		dispatch(setUserDetailsAction());
	}, [dispatch]);
	console.log(props);
	return (
		<Grid container className={classes.root}>
			<NavBar />
			<Grid className={classes.bottomNav}>
				<BottomNav />
			</Grid>
		</Grid>
	);
}

const mapStateToProps = state => ({
	details: state.UserDetailsReducer,
});

export default connect(mapStateToProps)(Home);
