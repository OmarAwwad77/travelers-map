import styled from 'styled-components';

import { ReactComponent as Traveler } from '../../assets/icons/traveler.svg';

export const Wrapper = styled.div`
	display: grid;
	padding: 1rem;

	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(3, 1fr);
	justify-content: center;
	align-items: end;
	grid-template-areas:
		'title svg'
		'text svg'
		'button svg';
	height: 52rem;
`;

export const TravelerSvg = styled(Traveler)`
	grid-area: svg;
	width: 100%;
	height: 100%;
`;

export const Title = styled.h1`
	grid-area: title;
	font-size: 5rem;
	font-weight: 700;
	text-align: center;
	text-transform: capitalize;
	pre {
		font-family: 'Roboto', sans-serif;
	}
`;

export const HeroText = styled.p`
	text-align: center;
	font-size: 1.8rem;
	line-height: 1.9;
`;

export const HeroButton = styled.button`
	justify-self: center;
	align-self: center;
	border: none;
	font-weight: 600;
	font-size: 1.7rem;
	padding: 1.5rem 4rem;
	border-radius: 0.5rem;
	text-transform: uppercase;

	background: ${(p) => p.theme.colors.secondary1};
`;
