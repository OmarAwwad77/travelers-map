import styled, { css } from 'styled-components';

export const Wrapper = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	background: #fff;
	border-radius: 5px;
	padding: 2rem 5rem;

	& > * {
		width: 100%;
		margin: 1rem 0;
	}
`;

export const TripNameWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

export const DropDownWrapper = styled.div<{ disabled?: boolean }>`
	height: 3rem;
	cursor: ${(p) => p.disabled && 'not-allowed'};
`;

export const Or = styled.span`
	display: inline-block;
	font-weight: bold;
	margin: 0.5rem 0;
	color: #7070ff;
	align-self: center;
`;

const inputStyles = css`
	font-family: inherit;
	font-size: inherit;
	border: 1px solid rgba(0, 0, 0, 0.2);
	outline: none;
	height: 3rem;
	padding: 1rem;
	transition: all 0.2s ease-out;

	&:hover,
	&:active,
	&:focus {
		border: 1px solid rgba(0, 0, 0, 0.6);
	}
`;

export const PlaceAddress = styled.input`
	${inputStyles};
`;

export const TripInput = styled.input<{ disabled: boolean }>`
	${inputStyles};
	cursor: ${(p) => p.disabled && 'not-allowed'};
	opacity: ${(p) => p.disabled && '.4'};

	&:hover,
	&:active,
	&:focus {
		border: ${(p) => !p.disabled && '1px solid rgba(0, 0, 0, 0.6)'};
	}
`;

export const PlaceName = styled.input`
	${inputStyles};
`;

export const TripDescription = styled.textarea`
	font-family: inherit;
	font-size: 1.5rem;
	line-height: 2rem;
	resize: none;
	height: 10rem;
	padding: 1rem;
	border: 1px solid rgba(0, 0, 0, 0.2);
	outline: none;
	transition: all 0.2s ease-out;
	&:hover,
	&:active,
	&:focus {
		border: 1px solid rgba(0, 0, 0, 0.6);
	}
`;

export const ImageUploadsWrapper = styled.div`
	width: 30rem;
	display: flex;
	justify-content: space-between;
`;

export const SaveButton = styled.button<{ disabled: boolean }>`
	width: 15rem;
	height: 3.5rem;
	padding: 1rem;
	outline: none;
	border: none;
	border-radius: 20px;
	background-color: #f68;
	color: #fff;
	transition: all 0.2s ease-in;
	&:hover {
		color: ${(p) => (p.disabled ? '#fff' : '#f68')};
		background-color: ${(p) => (p.disabled ? '#f68' : '#fff')};
		border: 1px solid #f68;
	}

	${(p) =>
		p.disabled &&
		css`
			cursor: not-allowed;
			opacity: 0.3;
		`}
`;
