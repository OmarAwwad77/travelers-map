import { NewsFeedActions } from './news-feed.types';
import { Place } from '../news-feed/news-feed.types';

export const fetchPlacesStart = (): NewsFeedActions => ({
	type: 'FETCH_PLACES_START',
});

export const fetchPlacesSuccess = (places: Place[]): NewsFeedActions => ({
	places,
	type: 'FETCH_PLACES_SUCCESS',
});

export const fetchPlacesFailure = (error: string): NewsFeedActions => ({
	error,
	type: 'FETCH_PLACES_FAILURE',
});
