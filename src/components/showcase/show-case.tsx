import React from 'react';
import { useHistory } from 'react-router-dom';

import paris from '../../assets/images/paris.png';
import amsterdam from '../../assets/images/amsterdam.png';
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
	const { push } = useHistory();

	return (
		<Wrapper>
			<ImageComposition>
				<Img url={paris} />
				<Img url={amsterdam} />
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
				<Button onClick={() => push('/sign')}>
					get a map <MapIcon />
				</Button>
			</TextArea>
		</Wrapper>
	);
};

export default ShowCase;
