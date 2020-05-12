import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Map from './components/map/map';
import AddPlace from './components/add-place/add-place';

const App = () => {
	return (
		<>
			<Route path='/map' component={Map} />
			<Switch>
				<Route path='/map/add-place/:id/:coords' exact component={AddPlace} />
			</Switch>
		</>
	);
};

export default App;
