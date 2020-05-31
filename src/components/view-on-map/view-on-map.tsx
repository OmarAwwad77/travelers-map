import React from 'react';
import styled from 'styled-components';
import WithModel from '../../hoc/With-model/With-model';
import Map from '../map/map';
import { Coords } from '../../redux/map/map.types';

const Wrapper = styled.div`
	width: 80vw;
	height: 70vh;

	.leaflet-container {
		width: 100%;
		height: 100%;
	}
`;

interface OwnProps {
	targetUserId: string;
	placeToShow: Coords;
	backDropOnClick: () => void;
}
type Props = OwnProps;
const ViewOnMap: React.FC<Props> = ({
	targetUserId,
	placeToShow,
	backDropOnClick,
}) => {
	return (
		<WithModel backDropOnClick={backDropOnClick}>
			<Wrapper>
				<Map targetUserId={targetUserId} />
			</Wrapper>
		</WithModel>
	);
};

export default ViewOnMap;
