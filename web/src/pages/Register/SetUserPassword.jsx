import {
	Button,
	makeStyles,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
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
		height: '25%',
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

function SetUserPassword(props) {
	const classes = useStyles();
	const [state, setState] = React.useState({
		password: '',
		confirm: '',
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
			const { password, confirm } = state;
			if (password !== confirm) {
				setState(state => ({
					...state,
					visibleSnackBar: true,
					snackbarMessage: 'Passwords do not match.',
					snackbarType: 'error',
				}));
				return;
			}
			const token = new URLSearchParams(props.location.search).get(
				'token',
			);
			const data = {
				password,
				token,
			};
			const response = await apiCall(`auth/passwordset`, data, 'POST');
			setState(state => ({
				...state,
				visibleSnackBar: true,
				snackbarMessage: response.msg,
				snackbarType: response.success ? 'success' : 'error',
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
				variant="elevation"
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
					PASSWORD
				</Typography>

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
					id="outlined-reset-input"
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
							confirm: e.target.value,
						});
					}}
				/>

				<Button onClick={register} color="primary" variant="contained">
					SUBMIT
				</Button>
				{/* <div className={classes.bottom}>
					<span className={classes.foot}>
						<Link to="/login">Remeber your Password?</Link>
					</span>
				</div> */}
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

export default SetUserPassword;
