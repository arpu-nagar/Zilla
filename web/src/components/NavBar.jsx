import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
const useStyles = makeStyles(theme => ({
	// root: {
	// 	flexGrow: 1,
	// },
	title: {
		flexGrow: 1,
	},
}));

export default function NavBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h5" className={classes.title}>
						ZILLA
					</Typography>
					<IconButton color="inherit" aria-label="logout">
						<ExitToAppIcon />
					</IconButton>
					<IconButton color="inherit" aria-label="logout">
						<Brightness4Icon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
}
