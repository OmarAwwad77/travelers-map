import styled, { keyframes } from 'styled-components';

export type AnimType = 'in' | 'out';
export type AnimDir = 'right' | 'left';
export type Image = {
	url: string;
	type?: AnimType;
	dir?: AnimDir;
	default?: boolean;
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

export const Wrapper = styled.div`
	width: 50rem;
	height: 35rem;
	position: relative;
	overflow: hidden;
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

export const SliderImg = styled.div<Image>`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background: url(${(p) => p.url}) center/cover no-repeat;
	animation: ${(p) => p.type && getAnim(p.type, p.dir!)} 1s ease-in forwards;
	z-index: ${(p) => p.default && 1};
`;

export const Arrow = styled.span<{ dir: 'left' | 'right' }>`
	width: 1.7rem;
	height: 1.7rem;
	position: absolute;
	top: 50%;
	border: 3px solid #333;
	border-bottom: none;
	border-left: none;
	cursor: pointer;
	z-index: 2;
	right: ${(p) => p.dir === 'right' && '1%'};
	left: ${(p) => p.dir === 'left' && '1%'};
	transform: translateY(-50%)
		rotate(${(p) => (p.dir === 'right' ? '45deg' : '-135deg')});
`;
