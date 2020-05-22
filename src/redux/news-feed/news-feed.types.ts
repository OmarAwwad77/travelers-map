import { DbUser } from '../user/user.types';
import { Coords } from '../map/map.types';

export interface User extends DbUser {
	userId: string;
}

export interface Place {
	placeId: number;
	placeName: string;
	placeDesc: string;
	placeImages: string[];
	placeCoords: Coords;
	tripId: number;
	userId: string;
}

export interface NewsFeedState {
	places: Place[];
	users: User[];
	loading: boolean;
	error: string | null;
}

export const FETCH_PLACES_START = 'FETCH_PLACES_START';
export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const FETCH_PLACES_FAILURE = 'FETCH_PLACES_FAILURE';
export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export interface FetchPlacesStart {
	type: typeof FETCH_PLACES_START;
}

export interface FetchPlacesSuccess {
	type: typeof FETCH_PLACES_SUCCESS;
	places: Place[];
}

export interface FetchPlacesFailure {
	type: typeof FETCH_PLACES_FAILURE;
	error: string;
}

export type NewsFeedActions =
	| FetchPlacesStart
	| FetchPlacesSuccess
	| FetchPlacesFailure;
