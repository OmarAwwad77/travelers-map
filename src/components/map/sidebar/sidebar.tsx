import React, { useEffect, useRef } from 'react';
import { Place, Trip } from '../../../redux/map/map.types';
import { Wrapper } from './sidebar.styles';
import UserTrip from '../../user-trip/user-trip';
import { deleteTrip } from '../../../redux/root.actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

export interface SideBarTrip extends Trip {
	places: Place[];
}

interface LinkDispatchToProps {
	deleteTrip: typeof deleteTrip;
}
interface OwnProps {
	trips: SideBarTrip[];
	show: boolean;
}
type Props = OwnProps & LinkDispatchToProps;

const SideBar: React.FC<Props> = ({ trips, show, deleteTrip }) => {
	const cleanedTrips = useRef(false);
	useEffect(() => {
		if (!cleanedTrips.current) {
			cleanedTrips.current = true;
			trips.forEach((trip) => {
				if (trip.places.length === 0) {
					deleteTrip({
						tripId: trip.tripId,
						tripName: trip.tripName,
					});
				}
			});
		}
	}, [trips]);

	return show ? (
		<Wrapper>
			{trips.map(({ places, tripName, tripId }) =>
				places.length === 0 ? null : (
					<UserTrip
						name={tripName}
						tripId={tripId}
						key={tripId}
						places={places}
					/>
				)
			)}
		</Wrapper>
	) : null;
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	deleteTrip: (tripId) => dispatch(deleteTrip(tripId)),
});

export default connect(null, mapDispatchToProps)(SideBar);
