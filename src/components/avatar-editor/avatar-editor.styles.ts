import styled from 'styled-components';

export const ImageUploadIcon = styled.label`
	margin-bottom: 1rem;
	width: 35%;
	transition: all 0.3s ease;
	cursor: pointer;
`;

export const Wrapper = styled.div`
	width: 23rem;
	height: 23rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const ImageUploadWrapper = styled.div<{ withUrl: boolean }>`
	background-color: #f5f7fa;
	border-radius: 0.5rem;
	border-radius: 50%;
	width: 21rem;
	height: 21rem;
	font-size: 1.1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: all 0.3s ease;
	position: relative;

	&:hover ${ImageUploadIcon} {
		transform: scale(1.3, 1.3);
		fill: white;
	}

	&:hover {
		background-color: ${(p) => (p.withUrl ? '#f5f7fa' : '#1715154d')};
		color: white;
	}

	& input[type='file'] {
		display: none;
	}
`;

export const ErrorMessage = styled.span`
	font-size: 1.2rem;
	text-transform: lowercase;
	color: red;
	height: 2rem;
	text-align: center;
	overflow: auto;
`;

export const RemoveImage = styled.button`
	font-family: inherit;
	font-weight: 600;
	outline: none;
	border: none;
	background: none;
	text-transform: capitalize;
	font-size: 1.3rem;
	color: #333;
	transition: all 0.2s ease-out;
	&:hover {
		color: ${(p) => p.theme.colors.secondary1};
	}
`;

export const ChangeImage = styled.label`
	font-weight: 600;
	font-size: 1.3rem;
	text-transform: capitalize;
	color: #333;
	cursor: pointer;
	margin-bottom: 2rem;
	transition: all 0.2s ease-out;
	&:hover {
		color: ${(p) => p.theme.colors.secondary1};
	}
`;
