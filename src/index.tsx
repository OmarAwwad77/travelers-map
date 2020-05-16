import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import * as serviceWorker from './serviceWorker';
import App from './App';
import GlobalStyles from './styles/global-styles';
import theme from './styles/theme';
import { store } from './redux/store';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<GlobalStyles />
					<App />
				</ThemeProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
