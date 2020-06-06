import React, { useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';
import { Place, Trip, MapState } from '../../../redux/map/map.types';
import { Wrapper } from './sidebar.styles';
import UserTrip from '../../user-trip/user-trip';
import { deleteTrip } from '../../../redux/root.actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NoContent } from '../../news-feed/news-feed.styles';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../../redux/root.reducer';
import { selectLoading } from '../../../redux/map/map.selectors';
import Spinner from '../../spinner/spinner';

export interface SideBarTrip extends Trip {
	places: Place[];
}

interface LinkDispatchToProps {
	deleteTrip: typeof deleteTrip;
}
interface LinkStateToProps extends Pick<MapState, 'loading'> {}
interface OwnProps {
	trips: SideBarTrip[];
	setShowSideBar: (show: boolean) => void;
	show: boolean;
}
type Props = OwnProps & LinkDispatchToProps & LinkStateToProps;

const SideBar: React.FC<Props> = ({
	trips,
	show,
	deleteTrip,
	setShowSideBar,
	loading,
}) => {
	const currentTrips = useRef<typeof trips>();
	useEffect(() => {
		currentTrips.current = trips;
	}, [trips]);

	const { colors } = useTheme();

	useEffect(() => {
		return () => {
			currentTrips.current!.forEach((trip) => {
				if (trip.places.length === 0) {
					deleteTrip({
						tripId: trip.tripId,
						tripName: trip.tripName,
					});
				}
			});
		};
	}, []);

	return (
		<Wrapper show={show} onClick={() => setShowSideBar(false)}>
			{loading ? (
				<Spinner color={colors.mainDarker} center width='5rem' height='5rem' />
			) : trips.length === 0 ? (
				<NoContent center>you haven't added any trips yet</NoContent>
			) : (
				trips.map(({ places, tripName, tripId }) =>
					places.length === 0 ? null : (
						<UserTrip
							name={tripName}
							tripId={tripId}
							key={tripId}
							places={places}
						/>
					)
				)
			)}
		</Wrapper>
	);
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	deleteTrip: (tripId) => dispatch(deleteTrip(tripId)),
});

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	loading: selectLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
