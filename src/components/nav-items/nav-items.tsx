import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as SignOutIcon } from '../../assets/icons/sign-out.svg';
import { ReactComponent as SignInIcon } from '../../assets/icons/sign-in.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/user.svg';
import { ReactComponent as MapIcon } from '../../assets/icons/place.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { Wrapper, NavItem, NavLink } from './nav-items.styles';
import { createStructuredSelector } from 'reselect';
import { UserState } from '../../redux/user/user.types';
import { selectUser } from '../../redux/user/user.selectors';
import { AppState } from '../../redux/root.reducer';
import { Dispatch } from 'redux';
import { signOut } from '../../redux/root.actions';

interface LinkStateToProps extends Pick<UserState, 'user'> {}
interface LinkDispatchToProps {
	signOut: typeof signOut;
}
interface OwnProps {}
type Props = LinkStateToProps & OwnProps & LinkDispatchToProps;

const NavItems: React.FC<Props> = ({ user, signOut }) => {
	return (
		<Wrapper>
			<NavItem>
				<NavLink exact to='/'>
					<HomeIcon />
					<span>home</span>
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink activeClassName='' to={user ? '/map' : '/sign'}>
					<MapIcon />
					<span>map</span>
				</NavLink>
			</NavItem>
			{user ? (
				<>
					<NavItem>
						<NavLink to='/profile'>
							<ProfileIcon />
							<span>profile</span>
						</NavLink>
					</NavItem>
					<NavItem onClick={signOut}>
						<SignOutIcon />
						<span>sign out</span>
					</NavItem>
				</>
			) : (
				<NavItem>
					<NavLink to='/sign'>
						<SignInIcon />
						<span>sign in/up</span>
					</NavLink>
				</NavItem>
			)}
		</Wrapper>
	);
};

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	user: selectUser,
});

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavItems);
