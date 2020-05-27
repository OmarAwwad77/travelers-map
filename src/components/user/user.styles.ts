import styled from 'styled-components';
import { HeroButton } from '../hero/hero.styles';

export const Wrapper = styled.div`
	width: 24rem;
	height: 10rem;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background: ${(p) => p.theme.colors.main};
	border-radius: 1rem;
	margin: 0 auto;
`;

export const UserAvatar = styled.div<{ url: string }>`
	background: url(${(p) => p.url}) center/cover no-repeat;
	width: 7rem;
	height: 7rem;
	border-radius: 50%;
	cursor: pointer;
`;

export const UserContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 85%;
	justify-content: space-around;
`;

export const UserName = styled.span`
	font-weight: 600;
	text-transform: capitalize;
	cursor: pointer;
`;

export const FollowButton = styled(HeroButton)`
	padding: 1rem 2rem;
	width: 11.5rem;
	border-radius: 1rem;
	text-transform: capitalize;
`;
