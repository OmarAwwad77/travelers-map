import styled from 'styled-components';

export const Wrapper = styled.div<{ show: boolean }>`
	position: absolute;
	z-index: 2;
	left: 0;
	top: 0;
	bottom: 0;
	background: #fff;
	max-width: 70%;
	width: 28rem;
	padding: 3rem 1rem;
	padding-top: 9rem;
	overflow-y: auto;
	transform: translateX(${(p) => (p.show ? 0 : '-100%')});
	transition: all 0.2s ease-out;
`;
