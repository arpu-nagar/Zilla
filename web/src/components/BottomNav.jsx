import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import BugReportIcon from '@material-ui/icons/BugReport';
import HomeIcon from '@material-ui/icons/Home';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';
import {
	setBacklog,
	setBugs,
	setHome,
	setTasks,
} from '../store/actions/PageAction';
import { connect } from 'react-redux';

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
});

function BottomNav(props) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const { dispatch } = props;
	console.log(props);
	return (
		<BottomNavigation
			value={value}
			onChange={(event, newValue) => {
				setValue(newValue);
				switch (newValue) {
					case 0: {
						dispatch(setHome());
						break;
					}
					case 1: {
						dispatch(setTasks());
						break;
					}
					case 2: {
						dispatch(setBugs());
						break;
					}
					case 3: {
						dispatch(setBacklog());
						break;
					}
				}
			}}
			showLabels
			className={classes.root}
		>
			<BottomNavigationAction label="Home" icon={<HomeIcon />} />
			<BottomNavigationAction
				label="Tasks"
				icon={<PlaylistAddCheckIcon />}
			/>
			<BottomNavigationAction label="Bugs" icon={<BugReportIcon />} />
			<BottomNavigationAction
				label="Backlog"
				icon={<SyncProblemIcon />}
			/>
		</BottomNavigation>
	);
}

const mapStateToProps = state => ({
	pageDetails: state.PageReducer,
});

export default connect(mapStateToProps)(BottomNav);
