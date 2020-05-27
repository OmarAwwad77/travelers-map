import styled from 'styled-components';

export const SignButton = styled.button<{ google?: boolean }>`
	font-family: inherit;
	font-size: inherit;
	font-weight: 600;
	text-transform: capitalize;
	margin-top: 2rem;
	border: none;
	width: 100%;
	height: 5rem;
	background: ${(p) => (p.google ? '#fff' : p.theme.colors.secondary1)};
	border: ${(p) => p.google && '1px solid #ddd'};
	display: flex;
	justify-content: center;
	align-items: center;
`;
