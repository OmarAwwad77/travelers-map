import styled from 'styled-components';
import { ReactComponent as LocationIcon } from '../../../assets/icons/place.svg';
export { ModelClose } from '../../model-backdrop/model-backdrop.styles';

export const Wrapper = styled.section`
	position: relative;
	z-index: 1;
	width: 100%;
	height: 100%;

	.leaflet-container {
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.sr-only {
		display: none;
	}
	div.leaflet-top.leaflet-left {
		top: 30%;
	}
`;

export const DropDownWrapper = styled.div`
	width: 12rem;
	height: 2.5rem;
	border-radius: 4px;
	background: #fff;
	position: absolute;
	left: 50%;
	top: 0;
	z-index: 3;
	transform: translateX(-50%);
`;

export const SaveIconWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3rem;
	height: 3rem;
	padding: 0.7rem;
	background: #fff;
	position: absolute;
	right: 1rem;
	top: 30%;
	z-index: 2;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
	border-radius: 2px;
	cursor: pointer;

	&::after {
		content: 'save';
		position: absolute;
		top: -102%;
		left: -50%;
		transition: all 0.3s ease-out;
		opacity: 0;
		visibility: hidden;
		background: #fff;
		border: 1px solid #b9b4b4;
		font-size: 1.4rem;
	}

	&:hover::after {
		opacity: 1;
		visibility: visible;
	}
`;

export const LocateMe = styled.a`
	width: 17rem;
	display: flex;
	align-items: center;
	text-decoration: none;
	cursor: pointer;
	position: absolute;
	z-index: 2;
	top: 30px;
	right: 50%;
	transform: translateX(50%);
	text-transform: capitalize;
	padding: 0.5rem 1rem;
	background: #fff;
	color: ${(p) => p.theme.colors.secondary2};
	font-size: 1.5rem;
	border-radius: 1rem;
	border: 1px solid #ccc;
	transition: all 0.2s ease-out;

	&:hover,
	&:hover svg {
		color: ${(p) => p.theme.colors.secondary1};
	}
`;

export const LocateMeIcon = styled(LocationIcon)`
	width: 2rem;
	height: 2rem;
	margin-left: 1rem;
	color: ${(p) => p.theme.colors.secondary2};
	transition: all 0.2s ease-out;
`;

export const AddPlaceByName = styled.input`
	position: absolute;
	z-index: 2;
	top: 7rem;
	right: 50%;
	transform: translateX(50%);
	padding: 0.5rem 1rem;
	font-family: inherit;
	font-size: 1.5rem;
	outline: none;
	border: 1px solid #ccc;
	border-radius: 1rem;
`;

export const PlaceInputResults = styled.div<{ show: boolean }>`
	opacity: ${(p) => (p.show ? 1 : 0)};
	position: absolute;
	z-index: ${(p) => (p.show ? 2 : 0)};
	top: 10rem;
	right: 50%;
	transform: translateX(50%);
	padding: 2rem;
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 20rem;
	font-size: 1.4rem;
	text-transform: capitalize;
	transition: all 0.2s ease-out;
	& > span {
		cursor: pointer;
		text-align: center;
		&:not(:first-of-type) {
			margin-top: 1rem;
		}
		&:hover {
			color: ${(p) => p.theme.colors.secondary1};
		}
	}
`;
