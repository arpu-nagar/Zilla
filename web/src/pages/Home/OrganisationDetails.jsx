import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	Fab,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import AddUserDialog from './AddUserDialog';
const useStyles = makeStyles(theme => ({
	root: {
		height: '78vh',
		marginTop: '5vh',
		marginLeft: 10,
		marginRight: 10,
		fontWeight: 400,
		minWidth: '90vw',
		display: 'flex',
		flexDirection: 'column',
	},
	title: {
		fontWeight: 300,
		marginBottom: '10vh',
		marginLeft: '3vw',
	},
	head: {
		marginLeft: '30%',
	},
	addButton: {
		marginLeft: 'auto',
		marginTop: 'auto',
		marginRight: 5,
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[800]),
		backgroundColor: deepOrange[800],
		width: '150px',
		height: '150px',
		fontSize: 64,
		marginBottom: '20px',
	},
}));

function OrganisationDetails(props) {
	const { details } = props;
	console.log(details);
	const [state, setState] = React.useState({
		addUserDialogOpen: false,
	});
	const classes = useStyles();
	const close = () => {
		setState(state => ({
			...state,
			addUserDialogOpen: false,
		}));
	};
	const open = () => {
		setState(state => ({
			...state,
			addUserDialogOpen: true,
		}));
	};
	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<div className={classes.head}>
					<Avatar className={classes.orange}>AN</Avatar>
					<Typography variant={'h5'} className={classes.title}>
						{details.me}
					</Typography>
				</div>

				<Typography variant={'h6'}>
					Hi! 👋 Welcome to {details.name}.
				</Typography>
				<Typography variant={'body1'}>
					About your organisation:
				</Typography>
				<Typography variant={'subtitle2'}>
					<br /> {details.description}
				</Typography>
				<Typography variant={'body1'}>Your email:</Typography>
				<Typography variant={'subtitle2'}>
					<br /> {details.email}
				</Typography>
				<Typography variant={'body1'}>Owner:</Typography>
				<Typography variant={'subtitle2'}>
					<br /> {details.owner}
				</Typography>
			</CardContent>
			<div className={classes.addButton}>
				<CardActions>
					<Fab color="primary" aria-label="add">
						<AddIcon onClick={open} />
					</Fab>
				</CardActions>
			</div>
			<AddUserDialog open={state.addUserDialogOpen} close={close} />
		</Card>
	);
}

export default OrganisationDetails;
