import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Map from './components/map/map';
import AddPlace from './components/add-place/add-place';
import PlaceDetails from './components/place-details/place-details';
import Main from './pages/main/main.page';
import Layout from './components/layout/layout';
import Sign from './pages/sign/sign.page';
import Profile from './pages/profile/profile.page';
import { Dispatch } from 'redux';
import { setCurrentUser } from './redux/root.actions';
import { UserState, User } from './redux/user/user.types';
import { createStructuredSelector } from 'reselect';
import { AppState } from './redux/root.reducer';
import { selectUser } from './redux/user/user.selectors';
import StrangerProfile from './pages/stranger-profile/stranger-profile.page';

/**
 *
 */
interface LinkStateToProps extends Pick<UserState, 'user'> {}
interface LinkDispatchToProps {
	setCurrentUser: typeof setCurrentUser;
}
interface OwnProps {}
type Props = LinkDispatchToProps & LinkStateToProps & OwnProps;
const App: React.FC<Props> = ({ setCurrentUser, user }) => {
	let currUser: User | null = null;
	if (!user) {
		let storageUser = localStorage.getItem('user');
		if (storageUser) {
			currUser = JSON.parse(storageUser) as User;
			setCurrentUser();
		}
	} else {
		currUser = user;
	}

	let routes;
	if (currUser) {
		routes = (
			<Switch>
				<Route path='/profile' component={Profile} />
				<Route path='/user/:id' component={StrangerProfile} />
				<Route path='/map' component={Map} />

				<Route
					path='/'
					exact
					render={(props) => <Main {...props} user={currUser} />}
				/>
				<Redirect to='/' />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path='/sign' component={Sign} />
				<Route
					path='/'
					exact
					render={(props) => <Main {...props} user={currUser} />}
				/>
				<Redirect to='/' />
			</Switch>
		);
	}

	return <Layout>{routes}</Layout>;
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	setCurrentUser: () => dispatch(setCurrentUser()),
});

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	user: selectUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
