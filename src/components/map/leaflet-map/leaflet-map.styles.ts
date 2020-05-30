import styled from 'styled-components';
import { ReactComponent as LocationIcon } from '../../../assets/icons/place.svg';

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
	z-index: 2;
	transform: translateX(-50%);
`;

export const SaveIconWrapper = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 2.5rem;
	height: 2.5rem;
	padding: 0.4rem;
	background: #fff;
	position: absolute;
	right: 1rem;
	top: 40%;
	z-index: 2;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);
	border-radius: 4px;
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
	display: flex;
	align-items: center;
	text-decoration: none;
	cursor: pointer;
	position: absolute;
	z-index: 2;
	top: 0%;
	right: 25%;
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
	top: 0%;
	right: 5%;
	padding: 0.5rem 1rem;
	font-family: inherit;
	font-size: 1.5rem;
	outline: none;
	border: 1px solid #ccc;
	border-radius: 1rem;
`;
