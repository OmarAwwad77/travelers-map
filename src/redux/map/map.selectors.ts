import { createSelector } from 'reselect';
import { AppState } from '../root.reducer';

export const selectMapState = (state: AppState) => state.map;

export const selectPlaces = createSelector(
	[selectMapState],
	(map) => map.places
);

export const selectTrips = createSelector([selectMapState], (map) => map.trips);
