import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ withTargetUser: boolean }>`
	position: relative;
	height: ${(p) => (p.withTargetUser ? '100%' : '100vh')};
	overflow: hidden;
	z-index: 1;
`;

const iconStyles = css`
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 3;
	position: absolute;
	left: 1rem;
`;

export const MenuIconWrapper = styled.div`
	${iconStyles};
	top: 5rem;
	width: 3rem;
	height: 3rem;
`;

export const BackButton = styled.span`
	${iconStyles};
	top: 1rem;
	font-size: 4rem;
	height: 2rem;
	cursor: pointer;
`;
