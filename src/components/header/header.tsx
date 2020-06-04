import React, { SetStateAction } from 'react';
import { connect } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import NavItems from '../nav-items/nav-items';
import { toggleShowScrollButton } from '../../redux/root.actions';
import { Wrapper, LogoWrapper } from './header.styles';
import { Dispatch } from 'redux';
/**
 *
 */

interface LinkDispatchToProps {
	toggleShowScrollButton: typeof toggleShowScrollButton;
}
interface OwnProps {
	setShowNavSidebar: React.Dispatch<SetStateAction<boolean>>;
}

type Props = LinkDispatchToProps & OwnProps;

const Header: React.FC<Props> = ({
	toggleShowScrollButton,
	setShowNavSidebar,
}) => {
	return (
		<VisibilitySensor partialVisibility onChange={toggleShowScrollButton}>
			<Wrapper id='header'>
				<LogoWrapper>
					<Logo height='100%' width='5rem' />
					<span>traveler's map</span>
				</LogoWrapper>
				<nav>
					<NavItems mainNav setShowNavSidebar={setShowNavSidebar} />
				</nav>
			</Wrapper>
		</VisibilitySensor>
	);
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	toggleShowScrollButton: (isVisible) =>
		dispatch(toggleShowScrollButton(isVisible)),
});

export default connect(null, mapDispatchToProps)(Header);
