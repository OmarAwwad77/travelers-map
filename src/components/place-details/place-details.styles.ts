import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	width: 50vw;
	max-width: 60rem;
	min-width: 29rem;
	padding: 0.5rem 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 1.5rem;

	& > * {
		margin: 0.5rem 0;
	}
`;

const titleStyles = css`
	font-weight: bold;
	text-transform: capitalize;
	text-align: center;
	font-size: 2rem;
`;
export const PlaceName = styled.h2`
	${titleStyles}
`;

export const DescTitle = styled.h2`
	${titleStyles}
	margin: 2rem 0 .5rem 0;
`;
export const PlaceDesc = styled.p`
	text-transform: capitalize;
	text-align: center;
`;

export const AddressTitle = styled.h2`
	${titleStyles}
	margin-top: 1rem;
`;
