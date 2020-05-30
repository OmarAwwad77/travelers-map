import styled from 'styled-components';
export { SideBarWrapper } from '../../pages/profile/profile.page.styles';

export const Wrapper = styled.div`
	padding: 1rem;
	display: flex;
	justify-content: center;
`;

export const PostsArea = styled.div`
	width: 70%;
	/* overflow-y: scroll;
	height: calc(100vh - 13rem); */
	padding: 5rem;
	display: flex;
	flex-direction: column;
	align-items: center;

	& > *:not(:first-child) {
		margin-top: 4rem;
	}
`;
