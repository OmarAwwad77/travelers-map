import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<CSSProperties & { center?: boolean }>`
	width: ${(p) => p.width ?? '100%'};
	height: ${(p) => p.height ?? '100%'};
	margin: ${(p) => p.margin};
	position: relative;

	${(p) =>
		p.center &&
		css`
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		`}

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
	center?: boolean;
} & CSSProperties;
const Spinner: React.FC<Props> = ({
	color,
	className,
	width,
	height,
	margin,
	center,
}) => (
	<Wrapper
		center={center}
		width={width}
		margin={margin}
		height={height}
		className={className}
	>
		<Bounce1 color={color} />
		<Bounce2 color={color} />
	</Wrapper>
);

export default Spinner;
