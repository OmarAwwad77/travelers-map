import styled from 'styled-components';

export const Model = styled.div`
	position: fixed;
	z-index: 4;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	border-radius: 1rem;
	overflow-y: auto;
`;

export const ModelClose = styled.span`
	position: absolute;
	top: 0.5rem;
	right: 1.5rem;
	cursor: pointer;

	&::before,
	&::after {
		content: '';
		width: 1px;
		height: 1.3rem;
		background-color: grey;
		display: inline-block;
		transform: rotate(45deg);
		transition: all 0.3s ease;
	}
	&::after {
		transform: rotate(-45deg);
	}
`;

export const ModelContent = styled.div`
	margin: 3rem 1rem 2rem 1rem;
	max-height: 85vh;
`;

export const Backdrop = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	z-index: 3;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.25);
`;
