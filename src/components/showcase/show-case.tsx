import React from 'react';

import paris from '../../assets/images/paris.png';
import {
	Wrapper,
	ImageComposition,
	Img,
	TextArea,
	Text,
	Title,
	Button,
	MapIcon,
} from './show-case.styles';

const ShowCase = () => {
	return (
		<Wrapper>
			<ImageComposition>
				<Img url={paris} />
				<Img url={paris} />
			</ImageComposition>
			<TextArea>
				<Title>Interactive maps</Title>
				<Text>
					an Interactive map for each traveler on which they can pin and
					document their trips and share it with the community. users start by
					creating new trips, each trip can contain a number of destinations
					with their related photographs and description texts of the various
					places.
				</Text>
				<Button>
					get a map <MapIcon />
				</Button>
			</TextArea>
		</Wrapper>
	);
};

export default ShowCase;
