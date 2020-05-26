import styled from 'styled-components';
import { PostAvatar } from '../post/post.styles';

export const Wrapper = styled.div`
	margin: 0 auto;
	padding: 1rem;
	width: 90%;

	&:not(:last-child) {
		/* margin-bottom: 1rem; */
	}
`;

export const Grid = styled.div<{ nested?: boolean }>`
	display: grid;
	gap: 0rem 1.2rem;
	grid-template-rows: ${(p) =>
		p.nested ? '2rem 2rem 1fr' : '2rem 2rem 1fr 2rem'};
	grid-auto-columns: 5rem 1fr;
	margin-bottom: 0.7rem;
`;

export const CommentOwner = styled.span`
	grid-area: 2 / 2 / 3/ 3;
	font-size: 1.4rem;
	font-weight: 600;
	text-transform: capitalize;
`;

export const CommentDate = styled.span`
	grid-area: 1 / 2 / 2/ 3;
	font-size: 1.2rem;
	font-weight: 600;
	opacity: 0.8;
`;

export const CommentAvatar = styled(PostAvatar)<{ url: string }>`
	grid-area: 1 / 1 / -1/ 2;
`;

export const CommentText = styled.p`
	grid-area: 3 / 2 / 4/ 3;
	font-size: 1.4rem;
`;

export const CommentFooter = styled.div`
	grid-area: 4 / 2 / 5 / 3;
	display: flex;
	/* justify-content: space-around; */
	font-size: 1.3rem;
	margin-top: 0.5rem;

	& > span {
		cursor: pointer;
		text-decoration: underline;
		&:hover {
			color: ${(p) => p.theme.colors.secondary1};
		}
	}
`;
