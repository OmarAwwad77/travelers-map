import styled from 'styled-components';
import { HeroButton } from '../hero/hero.styles';
import { ReactComponent as MapSvg } from '../../assets/icons/place.svg';

export const Wrapper = styled.div`
	background: ${(p) => p.theme.colors.mainDarker};
	padding: 5rem 3rem;
	height: 60rem;
	display: flex;
	justify-content: space-between;
`;

export const ImageComposition = styled.div`
	position: relative;
	width: 44rem;
	height: 46rem;
	margin-left: 1rem;
	& > *:hover {
		z-index: 1;
	}
	&:hover > *:not(:hover) {
		transform: scale(0.9);
	}
`;

export const Img = styled.div<{ url: string }>`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
	background-image: url(${(p) => p.url});
	width: 35rem;
	height: 39rem;
	background-size: cover;
	background-position: center;
	border-radius: 11px;
	transition: all 0.2s ease-out;
	outline: 0rem solid ${(p) => p.theme.colors.secondary1};
	outline-offset: 0rem;
	&:last-child {
		top: 15%;
		left: 20%;
	}
	&:hover {
		outline: 2.5rem solid ${(p) => p.theme.colors.secondary1};
		outline-offset: 2rem;
	}
`;

export const TextArea = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`;
export const Title = styled.h2`
	font-size: 4rem;
	text-align: center;
	text-transform: capitalize;
`;
export const Text = styled.p`
	text-transform: capitalize;
	line-height: 1.9;
`;

export const Button = styled(HeroButton)`
	display: flex;
	align-items: flex-end;
	background: ${(p) => p.theme.colors.secondary2};
	color: #fff;
`;

export const MapIcon = styled(MapSvg)`
	width: 2.5rem;
	height: 2.5rem;
	color: ${(p) => p.theme.colors.mainDarker};
	margin-left: 1rem;
`;
