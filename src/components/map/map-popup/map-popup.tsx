import React from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';
import { Place, MarkerToAdd } from '../../../redux/map/map.types';
import { Popup } from 'react-leaflet';
import Slider from '../../slider/slider';
import { connect } from 'react-redux';
import { StoreActions, setMarkerToAdd } from '../../../redux/root.actions';
import { Dispatch } from 'redux';
import {
	Wrapper,
	ImgWrapper,
	AddPlaceLink,
	PlaceName,
} from './map-popup.styles';

interface LinkDispatchToProps {
	setMarkerToAdd: typeof setMarkerToAdd;
}
interface OwnProps {
	place?: Place;
	markerToAdd?: MarkerToAdd;
	withTargetUser?: boolean;
}
type Props = OwnProps & LinkDispatchToProps;

const MapPopup: React.FC<Props> = ({
	place,
	markerToAdd,
	setMarkerToAdd,
	withTargetUser,
}) => {
	const { path } = useRouteMatch();
	const { push } = useHistory();

	return (
		<Popup>
			<Wrapper withImages={!!place}>
				{place ? (
					<>
						<PlaceName>{place.placeName}</PlaceName>
						<Slider width='21rem' height='18rem' urls={place.placeImages} />
						{!withTargetUser && (
							<Link to={`${path}/place-details/${place.placeId}`}>
								see more...
							</Link>
						)}
					</>
				) : (
					<AddPlaceLink
						onClick={() => {
							setMarkerToAdd(markerToAdd!);
							push(`${path}/add-place`);
						}}
					>
						Add a Place
					</AddPlaceLink>
				)}
			</Wrapper>
		</Popup>
	);
};

const mapDispatchToProps = (
	dispatch: Dispatch<StoreActions>
): LinkDispatchToProps => ({
	setMarkerToAdd: (markerToAdd) => dispatch(setMarkerToAdd(markerToAdd)),
});

export default connect(null, mapDispatchToProps)(MapPopup);
