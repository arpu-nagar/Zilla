import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BottomNav from '../../components/BottomNav';
import NavBar from '../../components/NavBar';
import OrganisationDetails from '../../components/OrganisationDetails';
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
	return (
		<Grid container className={classes.root}>
			<NavBar />
			<OrganisationDetails details={props.details} />
			<Grid className={classes.bottomNav}>
				<BottomNav />
			</Grid>
		</Grid>
	);
}

const mapStateToProps = state => ({
	details: state.UserDetailsReducer,
	navigation: state.PageReducer,
});

export default connect(mapStateToProps)(Home);
