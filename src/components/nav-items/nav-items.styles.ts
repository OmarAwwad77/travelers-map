import styled, { css } from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import MediaQueries, { ThemedProps } from '../../styles/media-queries';

interface WrapperProps {
	sideNav: boolean;
}

type Props = ThemedProps<WrapperProps>;

export const NavItem = styled.li`
	display: flex;
	align-items: center;
	list-style: none;
	text-transform: capitalize;
	font-weight: 600;
	cursor: pointer;

	&:not(:last-child) {
		margin-right: 5rem;
	}

	span {
		margin-left: 0.7rem;
	}
	svg {
		width: 2.8rem;
		height: 2.8rem;
	}
`;

export const NavLink = styled(Link)`
	color: ${(p) => p.theme.colors.secondary2};
	text-decoration: none;
	display: flex;
	align-items: center;
	transition: all 0.2s ease-out;

	${MediaQueries.BREAK_POINT_950_PX(css`
		width: 12rem;
		justify-content: center;
	`)}

	&.active, &:hover {
		color: ${(p) => p.theme.colors.secondary1};
	}
`;

export const Wrapper = styled.ul<WrapperProps>`
	width: 100%;
	height: ${(p) => (p.sideNav ? '70%' : '5rem')};
	display: flex;
	align-items: center;
	flex-direction: ${(p) => p.sideNav && 'column'};
	justify-content: ${(p) => p.sideNav && 'space-around'};

	${NavItem} {
		${MediaQueries.BREAK_POINT_950_PX(css`
			display: ${(p: Props) => (p.sideNav ? 1 : 'none')};
			margin-right: ${(p: Props) => p.sideNav && 0};
		`)}
	}
	${NavItem}.menu-icon {
		margin-right: 0;
		display: none;
		${MediaQueries.BREAK_POINT_950_PX(css`
			display: block;
		`)}
	}
`;
