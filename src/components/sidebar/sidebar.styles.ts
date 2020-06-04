import styled, { css } from 'styled-components';
import MediaQueries from '../../styles/media-queries';

export const Wrapper = styled.div<{ width?: string }>`
	width: 100%;
	height: 100%;
	border-left: 2px solid ${(p) => p.theme.colors.mainDarker};
	min-height: 25rem;
	${MediaQueries.BREAK_POINT_850_PX(css`
		border: none;
		border-bottom: 2px solid ${(p) => p.theme.colors.mainDarker};
	`)}
`;

export const SidBarTitle = styled.h3`
	font-size: 2.5rem;
	text-transform: capitalize;
	margin-bottom: 4rem;
	text-align: center;
`;

export const Divider = styled.div`
	height: 1.5px;
	width: 80%;
	background: ${(p) => p.theme.colors.mainDarker};
	margin: 2.5rem auto 2.5rem auto;
`;
