import styled from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 30rem;
`;

export const Tab = styled.div<{ name: string; count?: number }>`
	height: 100%;
`;

export const TabName = styled.div<{ count?: number }>`
	height: 100%;
	width: ${(p) => `${100 / p.count!}%`};
	display: flex;
	justify-content: center;
	align-items: center;
	text-transform: capitalize;
	cursor: pointer;
`;

export const TabsWrapper = styled.div`
	height: 4rem;
	display: flex;
	background: ${(p) => p.theme.colors.mainDarker};
	position: relative;
`;

export const BorderBottom = styled.span<{ width: string; left: string }>`
	position: absolute;
	bottom: 0;
	left: ${(p) => p.left ?? 0};
	height: 1px;
	width: ${(p) => p.width};
	background: ${(p) => p.theme.colors.secondary2};
	transition: all 0.2s ease-out;
`;

export const TabContent = styled.div`
	flex-grow: 1;
	padding: 2rem 0;
	/* display: flex;
	justify-content: center;
	align-items: center; */
`;
