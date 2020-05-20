import styled from 'styled-components';

import { UserAvatar, UserName } from '../user/user.styles';
import { Divider as SlideBarDivider } from '../sidebar/sidebar.styles';

export const Wrapper = styled.div`
	width: 40rem;
	display: flex;
	flex-direction: column;
	border-radius: 0.3rem;
	border: 1px solid ${(p) => p.theme.colors.mainDarker};
`;

export const PostHeader = styled.div`
	padding: 2rem;
	height: 8rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const PostContent = styled.div`
	height: 30rem;
`;
export const PostFooter = styled.div`
	padding: 1rem;
	height: 11rem;
	display: grid;
	gap: 1rem 0;
	grid-template-rows: repeat(2, 1fr);
	grid-template-columns: 10rem 1fr 10rem;
	grid-template-areas:
		'likes placeName comments'
		'map placeName more';

	justify-items: center;
	align-items: center;
`;

export const PostAvatar = styled(UserAvatar)`
	width: 5rem;
	height: 5rem;
`;

export const PostOwner = styled(UserName)`
	font-size: initial;
	margin-right: auto;
	margin-left: 1.5rem;
`;

export const IconWithText = styled.span<{ gridArea?: string }>`
	grid-area: ${(p) => p.gridArea};
	text-transform: capitalize;
	font-size: 1.2rem;
	font-weight: 600;
	display: flex;
	align-items: center;
	svg {
		cursor: pointer;
		width: 3rem;
		height: 3rem;
		color: ${(p) => p.theme.colors.secondary1};
		margin-right: 0.5rem;
	}
`;

export const PlaceName = styled.span`
	text-align: center;
	grid-area: placeName;
	font-size: 1.6rem;
	font-weight: 600;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const Divider = styled(SlideBarDivider)`
	margin-top: 0;
	margin-bottom: 1rem;
`;
