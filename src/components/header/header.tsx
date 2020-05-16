import React from 'react';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import NavItems from '../nav-items/nav-items';
import { Wrapper, LogoWrapper } from './header.styles';

const Header = () => {
	return (
		<Wrapper>
			<LogoWrapper>
				<Logo height='100%' width='5rem' />
				<span>traveler's map</span>
			</LogoWrapper>
			<nav>
				<NavItems />
			</nav>
		</Wrapper>
	);
};

export default Header;
