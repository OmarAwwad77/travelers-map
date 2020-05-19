import { createSelector } from 'reselect';
import { AppState } from '../root.reducer';

export const selectMapState = (state: AppState) => state.mapState;

export const selectPlaces = createSelector(
	[selectMapState],
	(mapState) => mapState.places
);

export const selectTrips = createSelector(
	[selectMapState],
	(mapState) => mapState.trips
);

export const selectMapConfig = createSelector(
	[selectMapState],
	(mapState) => mapState.config
);

export const selectMarkerToAdd = createSelector(
	[selectMapState],
	(mapState) => mapState.markerToAdd
);
