import { Place, Trip, MapActions, MapConfig } from './map.types';

export const addPlace = (place: Place): MapActions => ({
	place,
	type: 'ADD_PLACE',
});

export const addTrip = (trip: Trip): MapActions => ({
	trip,
	type: 'ADD_TRIP',
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
