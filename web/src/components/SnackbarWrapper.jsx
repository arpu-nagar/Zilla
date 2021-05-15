import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Snackbar, SnackbarContent, Button, Slide } from '@material-ui/core';
import { green, blue, red, amber } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { ExitToApp } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

function TransitionLeft(props) {
	return <Slide {...props} direction="left" />;
}

function SnackbarWrapper(props) {
	let backgroundColor = blue[600];
	if (props.type === 'success') backgroundColor = green[500];
	else if (props.type === 'warning') backgroundColor = amber['A700'];
	else if (props.type === 'error') backgroundColor = red[500];
	const useStyles = makeStyles(theme => ({
		snackbar: {
			backgroundColor: backgroundColor,
			color: 'white',
		},
	}));

	const classes = useStyles();
	const vertical = props.vertical || 'top';
	const horizontal = props.horizontal || 'right';
	let autoHideDuration = 2000;
	if (props.autoHideDuration) {
		if (
			typeof props.autoHideDuration === 'string' &&
			props.autoHideDuration === 'always'
		)
			autoHideDuration = null;
		else if (typeof props.autoHideDuration === 'number')
			autoHideDuration = props.autoHideDuration;
	}
	const goTo = url => {
		props.history.push(url);
	};
	return (
		<Snackbar
			anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
			key={`${vertical},${horizontal}`}
			open={props.open}
			onClose={props.onClose}
			TransitionComponent={TransitionLeft}
			ContentProps={{
				'aria-describedby': 'snackbar-add-to-ds-id',
				role: 'alertdialog',
			}}
			autoHideDuration={autoHideDuration}
		>
			<SnackbarContent
				onClose={props.onClose}
				className={classes.snackbar}
				message={<span id="message-id">{props.message}</span>}
				action={
					props.showUndo ? (
						<Button color="inherit" size="small">
							Undo
						</Button>
					) : (
						<>
							{props.goToLink && props.goToLink.length > 0 && (
								<IconButton
									size="small"
									aria-label="close"
									color="inherit"
									onClick={() => goTo(props.goToLink)}
								>
									<ExitToApp fontSize="small" />
								</IconButton>
							)}
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={props.onClose}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</>
					)
				}
			/>
		</Snackbar>
	);
}
export default withRouter(SnackbarWrapper);
