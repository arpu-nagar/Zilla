import {
	Button,
	makeStyles,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import SnackbarWrapper from '../../components/SnackbarWrapper';
import { apiCall } from '../../infrastructure/api';

const useStyles = makeStyles({
	root: {
		height: '100vh',
		width: '100vw',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eef',
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: '10px',
		paddingBottom: '10px',
		marginBottom: '30px',
		paddingLeft: '30px',
		paddingRight: '30px',
		width: 320,
		height: '50%',
	},
	text: {
		marginBottom: '10px',
	},
	bottom: {
		marginTop: '20px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
	},
	foot: {
		fontSize: 13,
		color: 'grey',
	},
});

function RegisterPage(props) {
	const classes = useStyles();
	const [state, setState] = React.useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
		organisationName: '',
		organisationDescription: '',
		visibleSnackBar: false,
		snackbarMessage: '',
		snackbarType: '',
		autoHideDuration: 2000,
	});
	const closeSnackBar = () => {
		setState({ ...state, visibleSnackBar: false });
	};
	const register = async () => {
		try {
			const {
				email,
				name,
				password,
				confirmPassword,
				organisationName,
				organisationDescription,
			} = state;
			if (password !== confirmPassword) {
				setState(state => ({
					...state,
					visibleSnackBar: true,
					snackbarMessage: 'Passwords do not match',
					snackbarType: 'error',
				}));
				return;
			}
			const data = {
				name,
				email,
				password,
				organisation: organisationName,
				organisationDescription,
			};
			const response = await apiCall('auth/signup', data, 'POST');
			setState(state => ({
				...state,
				visibleSnackBar: true,
				snackbarMessage: response.msg,
				snackbarType: response.msg ? 'success' : 'error',
			}));
			setTimeout(() => {
				props.history.push('/login');
			}, 2000);
		} catch (err) {
			console.log(err);
			return;
		}
	};
	return (
		<div className={classes.root}>
			<Paper
				variant="contained"
				square
				elevation={3}
				className={classes.paper}
			>
				<Typography
					variant={'h4'}
					style={{
						fontWeight: 300,
						marginBottom: '10px',
					}}
				>
					REGISTER
				</Typography>
				<TextField
					id="outlined-name-input"
					label="Name"
					type="text"
					variant="outlined"
					className={classes.text}
					size="small"
					fullWidth
					required
					onChange={e => {
						setState({
							...state,
							name: e.target.value,
						});
					}}
				/>
				<TextField
					id="outlined-email-input"
					label="Email"
					type="text"
					variant="outlined"
					className={classes.text}
					fullWidth
					size="small"
					required
					onChange={e => {
						setState({
							...state,
							email: e.target.value,
						});
					}}
				/>
				<TextField
					id="outlined-password-input"
					label="Password"
					type="password"
					variant="outlined"
					className={classes.text}
					fullWidth
					size="small"
					required
					onChange={e => {
						setState({
							...state,
							password: e.target.value,
						});
					}}
				/>
				<TextField
					id="outlined-password-confirm-input"
					label="Confirm Password"
					type="password"
					variant="outlined"
					className={classes.text}
					fullWidth
					size="small"
					required
					onChange={e => {
						setState({
							...state,
							confirmPassword: e.target.value,
						});
					}}
				/>
				<TextField
					id="outlined-org-input"
					label="Create Organisation"
					type="text"
					variant="outlined"
					className={classes.text}
					fullWidth
					size="small"
					required
					onChange={e => {
						setState({
							...state,
							organsationName: e.target.value,
						});
					}}
				/>
				<TextField
					id="outlined-desc-input"
					label="Description"
					type="text"
					variant="outlined"
					className={classes.text}
					fullWidth
					size="small"
					onChange={e => {
						setState({
							...state,
							organisationDescription: e.target.value,
						});
					}}
				/>
				<Button onClick={register} color="primary" variant="contained">
					Sign Up
				</Button>
				<div className={classes.bottom}>
					<span className={classes.foot}>
						<Link to="/login">Already a User?</Link>
					</span>
				</div>
			</Paper>
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

export default RegisterPage;
