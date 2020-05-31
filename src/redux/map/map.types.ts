import AddPlace from '../../components/add-place/add-place';
import { LatLng, LatLngLiteral, LatLngTuple } from 'leaflet';

export type Coords = LatLng | LatLngLiteral | LatLngTuple;

export interface Place {
	placeId: number;
	placeName: string;
	placeAddress: string;
	placeDesc: string;
	placeImages: string[];
	placeCoords: Coords;
	tripId: number;
	createdAt: number;
	likes: string[];
	userId: string;
}

export interface Trip {
	tripId: number;
	tripName: string;
}

export interface MarkerToAdd {
	markerCoords: Coords;
	markerId: number;
}

export interface MapConfig {
	zoom: number;
	center: Coords;
}
export interface MapState {
	trips: Trip[];
	places: Place[];
	config: MapConfig;
	markerToAdd: MarkerToAdd | null;
}

export const ADD_PLACE = 'ADD_PLACE';
export const ADD_TRIP = 'ADD_TRIP';
export const DELETE_TRIP = 'DELETE_TRIP';
export const SET_TRIPS = 'SET_TRIPS';
export const SET_PLACES = 'SET_PLACES';
export const SET_MAP_CONFIG = 'SET_MAP_CONFIG';
export const SET_MARKER_TO_ADD = 'SET_MARKER_TO_ADD';

export interface AddPlace {
	type: typeof ADD_PLACE;
	place: Place;
}

export interface AddTrip {
	type: typeof ADD_TRIP;
	trip: Trip;
}

export interface DeleteTrip {
	type: typeof DELETE_TRIP;
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

export interface SetMarkerToAdd {
	type: typeof SET_MARKER_TO_ADD;
	markerToAdd: MarkerToAdd | null;
}

export type MapActions =
	| AddPlace
	| AddTrip
	| DeleteTrip
	| SetTrips
	| SetPlaces
	| SetMapConfig
	| SetMarkerToAdd;
