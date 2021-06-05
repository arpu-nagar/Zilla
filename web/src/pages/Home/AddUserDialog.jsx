import React from 'react';
import {
	Typography,
	Button,
	IconButton,
	TextField,
	FormControl,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import { secApiCall } from '../../infrastructure/api';
import SnackbarWrapper from '../../components/SnackbarWrapper';
const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	text: {
		marginBottom: '10px',
	},
}));

function AddUserDialog(props) {
	const [state, setState] = React.useState({
		name: '',
		email: '',
		visibleSnackBar: false,
		snackbarMessage: '',
		snackbarType: '',
		autoHideDuration: 2000,
	});
	const Transition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction="left" ref={ref} {...props} />;
	});

	const closeSnackBar = () => {
		setState({ ...state, visibleSnackBar: false });
	};

	const classes = useStyles();
	const submit = async () => {
		try {
			const data = {
				name: state.name,
				email: state.email,
			};
			const response = await secApiCall('user/addUser', data, 'POST');
			setState(state => ({
				...state,
				visibleSnackBar: true,
				snackbarMessage: response.msg,
				snackbarType: response.success ? 'success' : 'error',
			}));
			setTimeout(() => {
				props.close();
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div
			onContextMenu={e => {
				e.preventDefault();
			}}
		>
			<Dialog
				fullWidth={true}
				maxWidth={'sm'}
				open={props.open}
				onClose={props.onClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar variant="dense">
						<IconButton
							edge="start"
							color="inherit"
							onClick={props.onClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Add User
						</Typography>
					</Toolbar>
				</AppBar>
				<DialogContent>
					<br></br>
					<Typography variant="subtitle2">
						Fill the below form to invite a new member to your
						organisation.
					</Typography>
					<br></br>
					<TextField
						required
						id="name-required"
						label="Name"
						variant="outlined"
						fullWidth
						size="small"
						onChange={e =>
							setState({
								...state,
								name: e.target.value,
							})
						}
						className={classes.text}
					/>

					<TextField
						required
						id="email-required"
						label="Email"
						variant="outlined"
						fullWidth
						size="small"
						onChange={e =>
							setState({
								...state,
								email: e.target.value,
							})
						}
						className={classes.text}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.close} color="inherit">
						Cancel
					</Button>
					<Button onClick={submit} color="inherit">
						Yes
					</Button>
				</DialogActions>
			</Dialog>
			<SnackbarWrapper
				open={state.visibleSnackBar}
				onClose={closeSnackBar}
				message={state.snackbarMessage}
				type={state.snackbarType}
				autoHideDuration={state.autoHideDuration}
			/>
		</div>
	);
}
export default AddUserDialog;
