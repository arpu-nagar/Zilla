import {
	Button,
	makeStyles,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../infrastructure/api';
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
		paddingRight: '30px',
		paddingLeft: '30px',
		width: 320,
		height: 275,
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

function Login(props) {
	const classes = useStyles();
	React.useEffect(() => {}, []);
	const [state, setState] = React.useState({
		email: '',
		password: '',
	});
	const logIn = async () => {
		const data = {
			email: state.email,
			password: state.password,
		};
		const response = await login(data);
		if (response.success === true) {
			props.history.push('/');
		} else {
			console.log('Incorrect.');
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
					ZILLA
				</Typography>
				<TextField
					id="outlined-email-input"
					label="Email"
					type="text"
					variant="outlined"
					className={classes.text}
					size="small"
					fullWidth
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
					size="small"
					fullWidth
					onChange={e => {
						setState({
							...state,
							password: e.target.value,
						});
					}}
				/>
				<Button onClick={logIn} color="primary" variant="contained">
					Login
				</Button>
				<div className={classes.bottom}>
					<span className={classes.foot}>
						<Link to="/register">New here?</Link>
					</span>
					<span className={classes.foot}>
						<Link to="/reset-password">Forgot Password</Link>
					</span>
				</div>
			</Paper>
		</div>
	);
}

export default Login;
