import React, { Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';

const Lines = styled.span<{ dir: 'left' | 'right' }>`
	position: relative;
	display: inline-block;
	width: 70%;
	height: 70%;
	cursor: pointer;
	transform: ${(p) => p.dir === 'left' && 'rotateY(180deg)'};
`;

const lineStyles = css`
	position: absolute;
	right: 0;
	height: 2px;
	width: 100%;
	background-color: #000;
	border-radius: 12px;
	transition: width 0.3s ease;
`;

const Line1 = styled.span`
	${lineStyles}
	top: 0;
	width: 11px;
`;
const Line2 = styled.span`
	${lineStyles}
	top: 7px;
	width: 13px;
`;
const Line3 = styled.span`
	${lineStyles}
	top: 15px;
	bottom: 0;
`;

interface OwnProps {
	toggleSideBar: Dispatch<SetStateAction<boolean>>;
	dir: 'left' | 'right';
}
type Props = OwnProps;
const MenuIcon: React.FC<Props> = ({ toggleSideBar, dir }) => {
	return (
		<Lines dir={dir} onClick={() => toggleSideBar((prevState) => !prevState)}>
			<Line1 />
			<Line2 />
			<Line3 />
		</Lines>
	);
};

export default MenuIcon;
