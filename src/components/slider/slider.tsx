import React, { useState } from 'react';

import WithModel from '../../hoc/with-model/with-model';

import { Wrapper, SliderImg, Arrow, AnimDir, AnimType } from './slider.styles';

const images = [
	'https://i.picsum.photos/id/866/400/300.jpg',
	'https://i.picsum.photos/id/865/400/300.jpg',
];

interface AnimState {
	in: number;
	out: number;
	dir?: AnimDir;
	lastChange: number;
}
const throttle = 1000;
const Slider = () => {
	const [animState, setAnimState] = useState<AnimState>({
		in: 0,
		out: -1,
		lastChange: 0,
	});

	const slide = (dir: AnimDir) => {
		const newOut = animState.in;
		const now = new Date().getTime();
		if (now - animState.lastChange < throttle) return;

		if (dir === 'right') {
			const newIn = (animState.in + 1) % images.length;
			setAnimState({ in: newIn, out: newOut, dir: 'left', lastChange: now });
		} else {
			const newIn = animState.in === 0 ? images.length - 1 : animState.in - 1;
			setAnimState({ in: newIn, out: newOut, dir: 'right', lastChange: now });
		}
	};

	const getAnimType = (index: number): AnimType | undefined => {
		if (index === 0 && animState.out === -1) return;
		if (index === animState.in) return 'in';
		if (index === animState.out) return 'out';
	};

	return (
		<WithModel>
			<Wrapper>
				{images.map((url, i) => (
					<SliderImg
						key={i}
						url={url}
						type={getAnimType(i)}
						dir={animState.dir}
						default={animState.out === -1 && i === 0}
					/>
				))}
				<Arrow dir='right' onClick={() => slide('right')} />
				<Arrow dir='left' onClick={() => slide('left')} />
			</Wrapper>
		</WithModel>
	);
};

export default Slider;
