import styled, { keyframes, css } from 'styled-components';

export type AnimType = 'in' | 'out';
export type AnimDir = 'right' | 'left';
export type Image = {
	url: string;
	type?: AnimType;
	dir?: AnimDir;
	default?: boolean;
	running: boolean;
};
const inAnimLeft = keyframes`
  from{
    left: 100%;
    z-index: 0;

  }
  to{
    left: 0;
    z-index: 1;

  }
`;

const inAnimRight = keyframes`
  from{
    left: -100%;
    z-index: 0;

  }
  to{
    left: 0;
    z-index: 1;

  }
`;

const outAnimLeft = keyframes`
  from{
    left: 0;
    z-index: 1;

  }

  to{
    left: -100%;
    z-index: 0;

  }
`;
const outAnimRight = keyframes`
  from{
    left: 0;
    z-index: 1;

  }

  to{
    left: 100%;
    z-index: 0;

  }
`;

const getAnim = (type: AnimType, dir: AnimDir) => {
	let animName;
	if (type === 'in') {
		switch (dir) {
			case 'right':
				animName = inAnimRight;
				break;

			case 'left':
				animName = inAnimLeft;
				break;

			default:
				animName = inAnimLeft;
		}
	} else {
		switch (dir) {
			case 'right':
				animName = outAnimRight;
				break;

			case 'left':
				animName = outAnimLeft;
				break;

			default:
				animName = outAnimLeft;
		}
	}
	return animName;
};

interface WrapperProps {
	width: string;
	height: string;
	paddingTop?: string;
}
export const Wrapper = styled.div<WrapperProps>`
	width: ${(p) => p.width ?? '50rem'};
	height: ${(p) => p.height ?? '35rem'};
	position: relative;
	overflow: hidden;
	padding-top: ${(p) => p.paddingTop};
`;

export const SliderImg = styled.div<Image>`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	backface-visibility: hidden;
	background: url(${(p) => p.url}) center/cover no-repeat;
	animation: ${(p) => p.type && getAnim(p.type, p.dir!)}
		${(p) => (p.running ? '1s' : '0s')} ease-in forwards;
	z-index: ${(p) => p.default && 1};
`;

const arrowStyles = css`
	background: #fff;
	position: absolute;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	top: 50%;
	transform: translateY(-50%);
	cursor: pointer;
	z-index: 2;
`;

const beforeAndAfter = css`
	content: '';
	width: 1.2rem;
	height: 1.2rem;
	position: absolute;
	top: 50%;
	border: 2px solid #333;
	border-bottom: none;
	border-left: none;
`;

export const LeftArrow = styled.span<{ disabled: boolean }>`
	${arrowStyles}
	left: 1%;
	&::before {
		${beforeAndAfter};
		left: 40%;
		transform: translateY(-50%) rotate(-135deg);
	}
	opacity: ${(p) => p.disabled && 0.4};
	cursor: ${(p) => p.disabled && 'not-allowed'};
`;

export const RightArrow = styled.span<{ disabled: boolean }>`
	${arrowStyles}
	right: 1%;
	&::before {
		${beforeAndAfter};
		right: 40%;
		transform: translateY(-50%) rotate(45deg);
	}
	opacity: ${(p) => p.disabled && 0.4};
	cursor: ${(p) => p.disabled && 'not-allowed'};
`;
