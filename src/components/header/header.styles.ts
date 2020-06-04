import styled, { css } from 'styled-components';
import MediaQueries from '../../styles/media-queries';

export const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 5rem;
	min-width: 20rem;
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
	padding: 3rem 5rem 5rem 5rem;
	width: 100%;
	background: transparent;
	${LogoWrapper} {
		width: 30%;
	}
	${MediaQueries.BREAK_POINT_500_PX(css`
		padding: 3rem 2rem 3rem;
	`)}
`;
