import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	position: relative;

	@-webkit-keyframes sk-bounce {
		0%,
		100% {
			-webkit-transform: scale(0);
		}
		50% {
			-webkit-transform: scale(1);
		}
	}

	@keyframes sk-bounce {
		0%,
		100% {
			transform: scale(0);
			-webkit-transform: scale(0);
		}
		50% {
			transform: scale(1);
			-webkit-transform: scale(1);
		}
	}
`;
const bounceStyle = css`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	opacity: 0.6;
	position: absolute;
	top: 0;
	left: 0;
	animation: sk-bounce 2s infinite ease-in-out;
`;

const Bounce1 = styled.div<{ color?: string }>`
	${bounceStyle};
	background-color: ${(p) => p.color ?? '#333'};
`;

const Bounce2 = styled.div<{ color?: string }>`
	${bounceStyle};
	animation-delay: -1s;
	background-color: ${(p) => p.color ?? '#333'};
`;

type Props = {
	color?: string;
	className?: string;
};
const Spinner: React.FC<Props> = ({ color, className }) => (
	<Wrapper className={className}>
		<Bounce1 color={color} />
		<Bounce2 color={color} />
	</Wrapper>
);

export default Spinner;
