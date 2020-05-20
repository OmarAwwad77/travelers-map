import styled from 'styled-components';

export const Wrapper = styled.div`
	margin: 0 auto;
	width: 90%;
	padding: 1rem;
	display: flex;
	justify-content: center;

	& > input {
		font-family: inherit;
		font-size: 1.4rem;
		height: 3rem;
		flex-grow: 1;
		padding: 1rem;
		border: none;
		outline: none;
		border-bottom: 1px solid ${(p) => p.theme.colors.mainDarker};
		background: transparent;
		margin-left: 1rem;
	}
`;

export const Avatar = styled.div<{ url: string }>`
	background: url(${(p) => p.url}) center/cover no-repeat;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
`;
