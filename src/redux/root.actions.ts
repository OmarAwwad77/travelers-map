import { MapActions } from './map/map.types';

export {
	addPlace,
	addTrip,
	setTrips,
	setPlaces,
	setMapConfig,
} from './map/map.actions';

export type StoreActions = MapActions;
