import { MapState, MapActions, Place, Trip } from './map.types';
import { addItem } from './map.util';

const initialState: MapState = {
	trips: [],
	places: [],
	config: {
		center: [51.51, -0.06],
		zoom: 5,
	},
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

		case 'SET_TRIPS':
			return {
				...state,
				trips: action.trips,
			};

		case 'SET_PLACES':
			return {
				...state,
				places: action.places,
			};

		case 'SET_MAP_CONFIG':
			return {
				...state,
				config: action.config,
			};
		default:
			return state;
	}
};

export default mapReducer;
