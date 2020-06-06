import React, { useState, useEffect } from 'react';

import {
	Wrapper,
	SliderImg,
	LeftArrow,
	RightArrow,
	AnimDir,
	AnimType,
} from './slider.styles';

interface AnimState {
	in: number;
	out: number;
	dir?: AnimDir;
	lastChange: number;
	running: boolean;
}
const throttle = 1000;

interface Props {
	urls: string[];
	width: string;
	height: string;
	paddingTop?: string;
}
const Slider: React.FC<Props> = ({ urls, width, height, paddingTop }) => {
	const [animState, setAnimState] = useState<AnimState>({
		in: 0,
		out: -1,
		lastChange: 0,
		running: false,
	});

	useEffect(() => {
		if (animState.running) {
			setTimeout(() => {
				setAnimState((prev) => ({ ...prev, running: false }));
			}, throttle);
		}
	}, [animState.running]);

	const slide = (dir: AnimDir) => {
		const newOut = animState.in;
		const now = new Date().getTime();
		if (now - animState.lastChange < throttle) return;

		if (dir === 'right') {
			const newIn = (animState.in + 1) % urls.length;
			setAnimState({
				in: newIn,
				out: newOut,
				dir: 'left',
				lastChange: now,
				running: true,
			});
		} else {
			const newIn = animState.in === 0 ? urls.length - 1 : animState.in - 1;
			setAnimState({
				in: newIn,
				out: newOut,
				dir: 'right',
				lastChange: now,
				running: true,
			});
		}
	};

	const getAnimType = (index: number): AnimType | undefined => {
		if (index === 0 && animState.out === -1) return;
		if (index === animState.in) return 'in';
		if (index === animState.out) return 'out';
	};

	const arrowDisabled: boolean = urls.length === 1;

	return (
		<Wrapper width={width} height={height} paddingTop={paddingTop}>
			{urls.map((url, i) => (
				<SliderImg
					key={i}
					url={url}
					type={getAnimType(i)}
					running={animState.running}
					dir={animState.dir}
					default={animState.out === -1 && i === 0}
				/>
			))}
			<RightArrow
				disabled={arrowDisabled}
				{...(!arrowDisabled && { onClick: () => slide('right') })}
			/>
			<LeftArrow
				disabled={arrowDisabled}
				{...(!arrowDisabled && { onClick: () => slide('left') })}
			/>
		</Wrapper>
	);
};

export default Slider;
