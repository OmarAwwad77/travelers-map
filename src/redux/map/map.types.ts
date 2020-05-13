import AddPlace from '../../components/add-place/add-place';
import { LatLng, LatLngLiteral, LatLngTuple } from 'leaflet';

export type Coords = LatLng | LatLngLiteral | LatLngTuple;

export interface Place {
	placeId: number;
	placeName: string;
	placeDesc: string;
	placeImages: string[];
	placeCoords: Coords;
	tripId: number;
}

export interface Trip {
	tripId: number;
	tripName: string;
}

export interface MapConfig {
	zoom: number;
	center: Coords;
}
export interface MapState {
	trips: Trip[];
	places: Place[];
	config: MapConfig;
}

export const ADD_PLACE = 'ADD_PLACE';
export const ADD_TRIP = 'ADD_TRIP';
export const SET_TRIPS = 'SET_TRIPS';
export const SET_PLACES = 'SET_PLACES';
export const SET_MAP_CONFIG = 'SET_MAP_CONFIG';

export interface AddPlace {
	type: typeof ADD_PLACE;
	place: Place;
}

export interface AddTrip {
	type: typeof ADD_TRIP;
	trip: Trip;
}

export interface SetTrips {
	type: typeof SET_TRIPS;
	trips: Trip[];
}

export interface SetPlaces {
	type: typeof SET_PLACES;
	places: Place[];
}

export interface SetMapConfig {
	type: typeof SET_MAP_CONFIG;
	config: MapConfig;
}

export type MapActions =
	| AddPlace
	| AddTrip
	| SetTrips
	| SetPlaces
	| SetMapConfig;
