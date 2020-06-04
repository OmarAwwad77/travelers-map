import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Backdrop } from '../model-backdrop/model-backdrop.styles';
import NavItems from '../nav-items/nav-items';

interface OwnProps {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
}
type Props = OwnProps;

const NavSidebar: React.FC<Props> = ({ show, setShow }) => {
	return (
		<>
			<Backdrop hide={!show} onClick={(_) => setShow(false)} />
			<Wrapper show={show}>
				<NavItems setShowNavSidebar={setShow} />
			</Wrapper>
		</>
	);
};

export default NavSidebar;

const Wrapper = styled.div<{ show: boolean }>`
	display: flex;
	align-items: center;
	position: fixed;
	z-index: 4;
	top: 0;
	left: 0;
	background: #fff;
	height: 100vh;
	max-width: 70%;
	width: 34rem;
	transform: translateX(${(p) => (p.show ? 0 : '-100%')});
	transition: all 0.2s ease-out;
`;
