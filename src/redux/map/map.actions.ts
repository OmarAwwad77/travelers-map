import { Place, Trip, MapActions, MapConfig, MarkerToAdd } from './map.types';

export const addPlace = (place: Place): MapActions => ({
	place,
	type: 'ADD_PLACE',
});

export const addTrip = (trip: Trip): MapActions => ({
	trip,
	type: 'ADD_TRIP',
});

export const deleteTrip = (trip: Trip): MapActions => ({
	trip,
	type: 'DELETE_TRIP',
});

export const setTrips = (trips: Trip[]): MapActions => ({
	trips,
	type: 'SET_TRIPS',
});

export const setPlaces = (places: Place[]): MapActions => ({
	places,
	type: 'SET_PLACES',
});

export const setMapConfig = (config: MapConfig): MapActions => ({
	config,
	type: 'SET_MAP_CONFIG',
});

export const setMarkerToAdd = (
	markerToAdd: MarkerToAdd | null
): MapActions => ({
	markerToAdd,
	type: 'SET_MARKER_TO_ADD',
});
