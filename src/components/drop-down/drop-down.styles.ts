import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{ disabled?: boolean }>`
	width: 100%;
	height: 100%;
	position: relative;
	border: 1px solid rgba(0, 0, 0, 0.2);
	transition: all 0.2s ease-out;
	pointer-events: ${(p) => p.disabled && 'none'};
	opacity: ${(p) => p.disabled && '.4'};
	cursor: pointer;

	&:hover,
	&:active,
	&:focus {
		border: 1px solid rgba(0, 0, 0, 0.6);
	}

	&::after {
		content: '';
		display: inline-block;
		position: absolute;
		right: 5%;
		top: 45%;
		transform: rotate(180deg);
		width: 0;
		height: 0;
		border-left: 3px solid transparent;
		border-right: 3px solid transparent;
		border-bottom: 6px solid black;
	}
`;

export const ChosenValue = styled.span`
	display: block;
	position: absolute;
	top: 50%;
	left: 14%;
	transform: translate(0, -50%);
	z-index: 1;
`;

export const List = styled.div<{ show: boolean }>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 5px 10px;
	border: 1px solid #eee;
	box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
	background-color: #eee;
	position: relative;
	top: 100%;
	z-index: 5;
	transition: all 0.3s ease;
	opacity: ${(p) => (p.show ? '1' : '0')};
	visibility: ${(p) => (p.show ? 'visible' : 'hidden')};
`;

export const ListItem = styled.span`
	margin: 4px 0;

	&:hover {
		color: #ff0061;
	}
	&:active ${List} {
		opacity: 1;
		visibility: visible;
	}
`;

export const Input = styled.input`
	height: 100%;
	width: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 22;
	transform: translate(-50%, -50%);
	border: none;
	outline: none;
	cursor: pointer;
	color: transparent;
	background: transparent;
`;
