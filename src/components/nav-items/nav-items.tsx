import React from 'react';

import { ReactComponent as SignOutIcon } from '../../assets/icons/sign-out.svg';
import { ReactComponent as SignInIcon } from '../../assets/icons/sign-in.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/user.svg';
import { ReactComponent as MapIcon } from '../../assets/icons/place.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { Wrapper, NavItem, NavLink } from './nav-items.styles';

const NavItems = () => {
	const user = true;
	return (
		<Wrapper>
			<NavItem>
				<HomeIcon />
				<span>home</span>
			</NavItem>
			<NavItem>
				<MapIcon />
				<span>map</span>
			</NavItem>
			{user ? (
				<>
					<NavItem>
						<NavLink to='/profile'>
							<ProfileIcon />
							<span>profile</span>
						</NavLink>
					</NavItem>
					<NavItem>
						<SignOutIcon />
						<span>sign out</span>
					</NavItem>
				</>
			) : (
				<NavItem>
					<SignInIcon />
					<span>sign in</span>
				</NavItem>
			)}
		</Wrapper>
	);
};

export default NavItems;
