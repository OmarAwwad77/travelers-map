import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import GlobalStyles from './global-styles';
import { store } from './redux/store';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<GlobalStyles />
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

serviceWorker.unregister();
