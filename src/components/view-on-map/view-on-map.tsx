import React, { useState } from 'react';
import styled from 'styled-components';
// import { Map, Marker } from 'react-leaflet';

import WithModel from '../../hoc/With-model/With-model';
import { DropDownWrapper } from '../map/leaflet-map/leaflet-map.styles';
import DropDown from '../drop-down/drop-down';
// import { MapStyle, getMapStyle } from '../map/map';
import Map from '../map/map';

import Popup from '../map/map-popup/map-popup';
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
	// const [mapStyle, setMapStyle] = useState<MapStyle>('Light');

	return (
		<WithModel backDropOnClick={backDropOnClick}>
			<Wrapper>
				<Map targetUserId={targetUserId} />
				{/* <Map center={[51.51, -0.06]} zoom={5}>
					{getMapStyle(mapStyle)}
					<Marker position={[51.51, -0.06]}>
            <Popup place ></Popup> 
          </Marker>
				</Map>
				<DropDownWrapper style={{ top: '3px' }}>
					<DropDown
						list={['Light', 'Light2', 'Dark']}
						value={mapStyle as string}
						onChangeHandler={setMapStyle}
					/>
				</DropDownWrapper> */}
			</Wrapper>
		</WithModel>
	);
};

export default ViewOnMap;
