import { Place, Trip } from './map.types';
import { deleteTrip as deleteTripDb } from '../../firebase/firebase.utils';

export const addItem = (arr: Place[] | Trip[], item: Place | Trip) => {
	return [...arr, item];
};

export const deleteTrip = (trips: Trip[], tripToDelete: Trip) => {
	deleteTripDb(tripToDelete);
	return trips.filter((trip) => trip.tripId !== tripToDelete.tripId);
};
