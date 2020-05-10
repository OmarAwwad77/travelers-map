import styled from 'styled-components';

export const ImageUploadIcon = styled.label`
	margin-bottom: 1rem;
	width: 35%;
	transition: all 0.3s ease;
	cursor: pointer;
`;

export const Wrapper = styled.div`
	background-color: #f5f7fa;
	border-radius: 0.5rem;
	width: 14.2rem;
	height: 14.2rem;
	font-size: 1.1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transition: all 0.3s ease;
	position: relative;
	margin-bottom: 1rem;

	&:hover ${ImageUploadIcon} {
		transform: scale(1.3, 1.3);
		fill: white;
	}

	&:hover {
		background-color: #1715154d;
		color: white;
	}

	& input[type='file'] {
		display: none;
	}
`;

export const ImagePreviewOverlay = styled.div`
	display: flex;
	overflow: hidden;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	position: absolute;
	background-color: rgba(255, 0, 97, 0.5);
	top: 50%;
	left: 50%;
	width: 0%;
	height: 0%;
	transform: translate(-50%, -50%);
	transition: all 0.3s ease;

	a,
	label {
		cursor: pointer;
		text-decoration: none;
		font-size: 1.5rem;
		transition: all 0.3s ease;

		&:active {
			transform: scale(1.1);
		}
	}
`;

export const ImagePreview = styled.div<{ url?: string }>`
	width: 100%;
	height: 100%;
	position: relative;
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	background-image: url(${(p) => p.url ?? ''});

	&:hover,
	&:active ${ImagePreviewOverlay} {
		width: 100%;
		height: 100%;
	}
`;

export const ErrorMessage = styled.span`
	position: absolute;
	text-transform: capitalize;
	top: 105%;
	color: red;
`;
