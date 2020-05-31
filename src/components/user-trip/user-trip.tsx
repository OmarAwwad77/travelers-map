import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Place } from '../../redux/map/map.types';
import {
	StoreActions,
	setMapConfig,
	deleteTrip,
} from '../../redux/root.actions';

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
	deleteTrip: typeof deleteTrip;
}
interface OwnProps {
	name: string;
	places: Place[];
	tripId: number;
}

type Props = OwnProps & LinkDispatchToProps;
const UserTrip: React.FC<Props> = ({
	name,
	places,
	tripId,
	setMapConfig,
	deleteTrip,
}) => {
	// useEffect(() => {
	// 	if (places.length === 0) {
	// 		deleteTrip(tripId);
	// 	}
	// }, []);

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
	setMapConfig: (config) => dispatch(setMapConfig(config)),
	deleteTrip: (tripId) => dispatch(deleteTrip(tripId)),
});

export default connect(null, mapDispatchToProps)(UserTrip);
