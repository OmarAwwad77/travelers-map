import styled, { css } from 'styled-components';
import { ReactComponent as Traveler } from '../../assets/icons/traveler.svg';
import media from '../../styles/media-queries';

export const Wrapper = styled.div`
	display: grid;
	padding: 1rem;
	grid-template-columns: 1fr minmax(30rem, 1fr);
	grid-template-rows: repeat(3, 1fr);
	justify-content: center;
	align-items: end;
	grid-template-areas:
		'title svg'
		'text svg'
		'button svg';
	height: 52rem;

	${media.BREAK_POINT_850_PX(css`
		height: unset;

		grid-template-columns: 1fr;
		grid-template-rows: max-content 1fr 29rem 10rem;
		gap: 1rem;
		align-items: start;
		grid-template-areas:
			'title'
			'text'
			'svg'
			'button';
	`)}
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

	${media.BREAK_POINT_950_PX(css`
		font-size: 4.5rem;
	`)}

	${media.BREAK_POINT_430_PX(css`
		font-size: 3.5rem;
		align-self: center;
	`)}
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

	/* ${media.BREAK_POINT_850_PX(css`
		align-self: flex-end;
	`)} */
`;
