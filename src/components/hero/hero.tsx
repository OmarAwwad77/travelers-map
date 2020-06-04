import React from 'react';
import { useHistory } from 'react-router-dom';

import {
	Wrapper,
	TravelerSvg,
	Title,
	HeroText,
	HeroButton,
} from './hero.styles';

const Hero = () => {
	const titleText = `discover beautiful 
	destinations  `;
	const { push } = useHistory();
	return (
		<Wrapper>
			<TravelerSvg />
			<Title>
				<pre>{titleText}</pre>
			</Title>
			<HeroText>
				Traveler's map is an online community where travelers from around the
				globe can share beautiful destinations they have visited, follow fellow
				travelers and exchange information all using interactive online map.
			</HeroText>
			<HeroButton onClick={() => push('/sign')}>join now</HeroButton>
		</Wrapper>
	);
};

export default Hero;
