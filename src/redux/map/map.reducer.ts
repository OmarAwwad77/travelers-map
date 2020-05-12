import { MapState, MapActions, Place, Trip } from './map.types';
import { addItem } from './map.util';

const initialState: MapState = {
	trips: [],
	places: [],
};

const mapReducer = (state = initialState, action: MapActions): MapState => {
	switch (action.type) {
		case 'ADD_PLACE':
			return {
				...state,
				places: addItem(state.places, action.place) as Place[],
			};

		case 'ADD_TRIP':
			return {
				...state,
				trips: addItem(state.trips, action.trip) as Trip[],
			};

		default:
			return state;
	}
};

export default mapReducer;
