import { Place, Trip, MapActions, ADD_PLACE, ADD_TRIP } from './map.types';

export const addPlace = (place: Place): MapActions => ({
	place,
	type: ADD_PLACE,
});

export const addTrip = (trip: Trip): MapActions => ({
	trip,
	type: ADD_TRIP,
});
