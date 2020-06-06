import { MapState, MapActions, Place, Trip } from './map.types';
import { addItem, deleteTrip } from './map.util';

const initialState: MapState = {
	trips: [],
	places: [],
	loading: false,
	markerToAdd: null,
	config: {
		center: [51.51, -0.06],
		zoom: 5,
	},
};

const mapReducer = (state = initialState, action: MapActions): MapState => {
	switch (action.type) {
		case 'LOADING_START':
			return {
				...state,
				loading: true,
			};
		case 'ADD_PLACE':
			return {
				...state,
				loading: false,
				places: addItem(state.places, action.place) as Place[],
			};

		case 'ADD_TRIP':
			return {
				...state,

				trips: addItem(state.trips, action.trip) as Trip[],
			};

		case 'DELETE_TRIP':
			return {
				...state,
				trips: deleteTrip(state.trips, action.trip),
			};

		case 'SET_TRIPS':
			return {
				...state,
				loading: false,
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

		case 'SET_MARKER_TO_ADD':
			return {
				...state,
				markerToAdd: action.markerToAdd,
			};

		default:
			return state;
	}
};

export default mapReducer;
