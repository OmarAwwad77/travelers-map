import { createSelector } from 'reselect';
import { AppState } from '../root.reducer';
import { SideBarTrip } from '../../components/map/sidebar/sidebar';

export const selectMapState = (state: AppState) => state.mapState;

export const selectPlaces = createSelector(
	[selectMapState],
	(mapState) => mapState.places
);

export const selectTrips = createSelector(
	[selectMapState],
	(mapState) => mapState.trips
);

export const selectSideBarTrips = createSelector(
	[selectTrips, selectPlaces],
	(trips, places) =>
		trips.map((trip) => ({
			...trip,
			places: places.filter((place) => place.tripId === trip.tripId),
		}))
);

export const selectMapConfig = createSelector(
	[selectMapState],
	(mapState) => mapState.config
);

export const selectMarkerToAdd = createSelector(
	[selectMapState],
	(mapState) => mapState.markerToAdd
);

export const selectLoading = createSelector(
	[selectMapState],
	(mapState) => mapState.loading
);
