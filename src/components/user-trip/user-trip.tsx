import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Place, MapConfig } from '../../redux/map/map.types';
import { StoreActions, setMapConfig } from '../../redux/root.actions';

import {
	Wrapper,
	Places,
	Title,
	PlaceWrapper,
	PlaceName,
	PlaceIcon,
} from './user-trip.styles';

interface LinkDispatchToProps {
	setMapConfig: typeof setMapConfig;
}
interface OwnProps {
	name: string;
	places: Place[];
}

type Props = OwnProps & LinkDispatchToProps;
const UserTrip: React.FC<Props> = ({ name, places, setMapConfig }) => {
	return (
		<Wrapper>
			<Title>{name}</Title>
			<Places>
				{places.map((place) => (
					<PlaceWrapper
						key={place.placeId}
						onClick={() => setMapConfig({ zoom: 4, center: place.placeCoords })}
					>
						<PlaceName>{place.placeName}</PlaceName>
						<PlaceIcon />
					</PlaceWrapper>
				))}
			</Places>
		</Wrapper>
	);
};

const mapDispatchToProps = (
	dispatch: Dispatch<StoreActions>
): LinkDispatchToProps => ({
	setMapConfig: (config: MapConfig) => dispatch(setMapConfig(config)),
});

export default connect(null, mapDispatchToProps)(UserTrip);
