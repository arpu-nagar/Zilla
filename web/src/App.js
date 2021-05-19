import ZillaDriver from './pages/ZillaDriver';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from './store';
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
			<Provider store={store}>
				<MuiThemeProvider theme={theme}>
					<ZillaDriver />
				</MuiThemeProvider>
			</Provider>
		</div>
	);
}

export default App;
