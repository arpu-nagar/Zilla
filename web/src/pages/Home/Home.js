import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BottomNav from '../../components/BottomNav';
import NavBar from '../../components/NavBar';
import OrganisationDetails from './OrganisationDetails';
import { setUserDetailsAction } from '../../store/actions/UserDetailAction';
import Bugs from '../Bugs/Bugs';

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
	console.log(props.navigation.page);
	const currentPageDecider = () => {
		if (props.navigation.page === 'Home')
			return <OrganisationDetails details={props.details} />;
		else if (props.navigation.page === 'Tasks') return <div>1</div>;
		else if (props.navigation.page === 'Bugs') return <Bugs />;
		else return <div>3</div>;
	};
	return (
		<Grid container className={classes.root}>
			<NavBar />
			{currentPageDecider()}

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
