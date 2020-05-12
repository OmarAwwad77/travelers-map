import AddPlace from '../../components/add-place/add-place';

export interface Place {
	placeId: number;
	placeName: string;
	placeDesc: string;
	placeImages: string[];
	placeCoords: number[];
	tripId: number;
}

export interface Trip {
	id: number;
	tripName: string;
}

export interface MapState {
	trips: Trip[];
	places: Place[];
}

export const ADD_PLACE = 'ADD_PLACE';
export const ADD_TRIP = 'ADD_TRIP';

export interface AddPlace {
	type: typeof ADD_PLACE;
	place: Place;
}

export interface AddTrip {
	type: typeof ADD_TRIP;
	trip: Trip;
}

export type MapActions = AddPlace | AddTrip;
