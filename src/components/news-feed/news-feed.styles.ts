import styled, { css } from 'styled-components';
import MediaQueries from '../../styles/media-queries';
import Spinner from '../spinner/spinner';
export { SideBarWrapper } from '../../pages/profile/profile.page.styles';

export const Wrapper = styled.div`
	padding: 1rem;
	display: flex;
	justify-content: center;

	${MediaQueries.BREAK_POINT_850_PX(css`
		flex-direction: column-reverse;
		padding: 0.5rem;
		margin-top: 5rem;
	`)}
`;

export const PostsArea = styled.div`
	width: 70%;
	min-width: 31rem;
	/* overflow-y: scroll;
	height: calc(100vh - 13rem); */
	padding: 5rem;
	display: flex;
	flex-direction: column;
	align-items: center;

	& > *:not(:first-child) {
		margin-top: 4rem;
	}

	${MediaQueries.BREAK_POINT_950_PX(css`
		padding: 5rem 2rem;
	`)}
	${MediaQueries.BREAK_POINT_850_PX(css`
		margin: 0 auto;
	`)}
`;

export const Loading = styled(Spinner)`
	width: 7rem;
	height: 7rem;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`;

export const NoContent = styled.span<{
	fontSize?: string;
	y?: string;
	center?: boolean;
}>`
	font-size: ${(p) => p.fontSize ?? '1.5rem'};
	text-align: center;
	text-transform: capitalize;
	transform: translateY(${(p) => p.y ?? 0});
	color: #8c8b8b;

	${(p) =>
		p.center &&
		css`
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		`}
`;
