import styled from 'styled-components';

export const Wrapper = styled.ul`
	width: 100%;
	height: 5rem;
	display: flex;
	align-items: center;
`;

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
