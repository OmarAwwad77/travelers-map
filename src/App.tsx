import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Map from './components/map/map';
import AddPlace from './components/add-place/add-place';
import PlaceDetails from './components/place-details/place-details';
import Main from './pages/main/main.page';
import Layout from './components/layout/layout';
import Sign from './pages/sign/sign.page';
import Profile from './pages/profile/profile.page';

const App = () => {
	return (
		<Layout>
			<Route path='/profile' component={Profile} />
			<Route path='/sign' component={Sign} />
			<Route path='/' exact component={Main} />
			<Route path='/map' component={Map} />
			<Route path='/map/add-place' exact component={AddPlace} />
			<Route path='/map/place-details/:placeId' component={PlaceDetails} />
		</Layout>
	);
};

export default App;
