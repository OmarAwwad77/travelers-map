import styled from 'styled-components';
import { ReactComponent as PlaceIconUnStyled } from '../../assets/icons/place.svg';

export const Wrapper = styled.div`
	width: 100%;

	background: #eee;
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	& > * {
		width: 100%;
	}
`;

export const Title = styled.div`
	text-transform: capitalize;
	text-align: center;
	font-weight: bold;
	padding: 0.5rem;
`;

export const PlaceIcon = styled(PlaceIconUnStyled)`
	height: 2.5rem;
	transition: all 0.2s ease-out;
`;

export const PlaceName = styled.span`
	text-transform: capitalize;
	font-size: 1.5rem;
	transition: all 0.2s ease-out;
`;
export const PlaceWrapper = styled.div`
	height: 5rem;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	transition: all 0.2s ease-out;
	cursor: pointer;
	&:hover {
		color: #f68;
		${PlaceIcon} {
			transform: scale(1.15);
		}
	}
`;
export const Places = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	& > ${PlaceWrapper} {
		width: 100%;
	}
	&:hover ${PlaceWrapper}:not(:hover) ${PlaceIcon} {
		transform: scale(0.9);
	}
`;
