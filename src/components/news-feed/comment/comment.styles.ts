import styled from 'styled-components';
import { PostAvatar } from '../post/post.styles';

export const Wrapper = styled.div`
	margin: 0 auto;
	padding: 1rem;
	width: 90%;
	display: grid;
	gap: 0 1rem;
	grid-template-rows: 2rem 1fr 2rem;
	grid-auto-columns: 5rem 1fr;

	&:not(:last-child) {
		margin-bottom: 2rem;
	}
`;

export const CommentDate = styled.span`
	grid-area: 1 / 2 / 2/ 3;
	text-transform: capitalize;
	font-size: 1.2rem;
	font-weight: 600;
`;

export const CommentAvatar = styled(PostAvatar)`
	grid-area: 1 / 1 / 3/ 2;
`;

export const CommentText = styled.p`
	grid-area: 2 / 2 / 2/ 3;
	font-size: 1.4rem;
	text-transform: capitalize;
`;

export const CommentFooter = styled.div`
	grid-area: 3 / 2 / 4 / 3;
	display: flex;
	justify-content: space-around;
	text-decoration: underline;
	font-size: 1.3rem;
	margin-top: 0.5rem;
	span {
		cursor: pointer;
	}
`;
