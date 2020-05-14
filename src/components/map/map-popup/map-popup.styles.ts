import styled from 'styled-components';

export const Wrapper = styled.div<{ withImages: boolean }>`
	min-width: ${(p) => p.withImages && '35rem'};
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ImgWrapper = styled.div<{ url: string }>`
	width: 100%;
	height: 25rem;
	margin: 0.5rem 0;
	background: url(${(p) => p.url}) center/cover no-repeat;
`;

export const PlaceName = styled.span`
	text-transform: capitalize;
`;

export const AddPlaceLink = styled.a`
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;
