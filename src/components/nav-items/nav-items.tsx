import React, { SetStateAction, MouseEvent } from 'react';
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
import MenuIcon from '../menu-icon/menu-icon';

interface LinkStateToProps extends Pick<UserState, 'user'> {}
interface LinkDispatchToProps {
	signOut: typeof signOut;
}
interface OwnProps {
	setShowNavSidebar?: React.Dispatch<SetStateAction<boolean>>;
	mainNav?: boolean;
}
type Props = LinkStateToProps & OwnProps & LinkDispatchToProps;

const NavItems: React.FC<Props> = ({
	user,
	signOut,
	setShowNavSidebar,
	mainNav,
}) => {
	const onNavItemClicked = (e: MouseEvent<HTMLUListElement>) => {
		if (e.currentTarget !== e.target && !mainNav) setShowNavSidebar?.(false);
	};

	return (
		<Wrapper onClick={onNavItemClicked} sideNav={mainNav ? false : true}>
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
					{mainNav && setShowNavSidebar && (
						<NavItem className='menu-icon'>
							<div style={{ width: '3.5rem', height: '3.5rem' }}>
								<MenuIcon dir='left' toggleSideBar={setShowNavSidebar} />
							</div>
						</NavItem>
					)}
					<NavItem onClick={signOut}>
						<NavLink as='a'>
							<SignOutIcon />
							<span>sign out</span>
						</NavLink>
					</NavItem>
				</>
			) : (
				<>
					{mainNav && setShowNavSidebar && (
						<NavItem className='menu-icon'>
							<div style={{ width: '3.5rem', height: '3.5rem' }}>
								<MenuIcon dir='left' toggleSideBar={setShowNavSidebar} />
							</div>
						</NavItem>
					)}
					<NavItem>
						<NavLink to='/sign'>
							<SignInIcon />
							<span>sign in/up</span>
						</NavLink>
					</NavItem>
				</>
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
