import {
	Button,
	Card,
	CardActions,
	CardContent,
	Fab,
	makeStyles,
	Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
const useStyles = makeStyles({
	root: {
		height: '75vh',
		marginTop: '5vh',
		marginLeft: 10,
		marginRight: 10,
		fontWeight: 400,
		maxWidth: 600,
	},
	title: {
		fontSize: 32,
		fontWeight: 300,
		marginBottom: '5vh',
	},
	addButton: {
		marginLeft: 'auto',
		marginTop: 'auto',
		marginRight: 5,
	},
});

function OrganisationDetails(props) {
	const { details } = props;
	console.log(details);
	const classes = useStyles();
	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Typography className={classes.title}>
					{details.name}'s Dashboard
				</Typography>
				<Typography variant={'body1'}>
					Hi! 👋 Welcome {details.me}
				</Typography>
				<Typography variant={'body1'}>
					About your organisation: {details.description}
				</Typography>
				<Typography variant={'body1'}>
					Your email: {details.email}
				</Typography>
				<Typography variant={'body1'}>
					Owner: {details.owner}
				</Typography>
			</CardContent>
			<CardActions>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
				>
					<AddIcon />
				</Fab>
			</CardActions>
		</Card>
	);
}

export default OrganisationDetails;
