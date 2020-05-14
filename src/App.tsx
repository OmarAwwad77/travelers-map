import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Map from './components/map/map';
import AddPlace from './components/add-place/add-place';
import PlaceDetails from './components/place-details/place-details';
import Slider from './components/slider/slider';

const App = () => {
	return (
		<>
			<Route path='/' component={Slider} />
			<Route path='/map' component={Map} />
			<Switch>
				<Route path='/map/add-place' exact component={AddPlace} />
				<Route path='/map/place-details/:placeId' component={PlaceDetails} />
			</Switch>
		</>
	);
};

export default App;
