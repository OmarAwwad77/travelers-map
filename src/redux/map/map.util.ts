import { Place, Trip } from './map.types';

export const addItem = (arr: Place[] | Trip[], item: Place | Trip) => {
	return [...arr, item];
};
