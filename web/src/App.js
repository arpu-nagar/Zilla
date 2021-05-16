import ZillaDriver from './pages/ZillaDriver';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#004d40',
			light: '#757ce8',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			main: '#ec407a',
		},
	},
});
function App() {
	return (
		<div>
			<MuiThemeProvider theme={theme}>
				<ZillaDriver />
			</MuiThemeProvider>
		</div>
	);
}

export default App;
