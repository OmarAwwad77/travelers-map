import styled from 'styled-components';

export const LogoWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 5rem;
	cursor: pointer;

	span {
		font-size: 2rem;
		font-weight: 800;
		text-transform: capitalize;
	}
`;

export const Wrapper = styled.header`
	display: flex;
	justify-content: space-between;
	padding: 4rem 5rem 5rem 5rem;
	width: 100%;
	background: transparent;
	${LogoWrapper} {
		width: 20%;
	}
`;
