import { Place, Trip } from '../../redux/map/map.types';
import { Feature } from 'react-leaflet-draw';

export const getSideBarTrips = (places: Place[], trips: Trip[]) =>
	trips.map((trip) => ({
		...trip,
		places: places.filter((place) => place.tripId === trip.tripId),
	}));

export const getPlacesFromFeatures = (features: Feature[]): Place[] =>
	features
		.filter((feature) =>
			feature.properties?.placeId && feature.geometry.type === 'Point'
				? true
				: false
		)
		.map((feature) => ({
			placeId: feature.properties?.placeId,
			placeName: feature.properties?.placeName,
			placeDesc: feature.properties?.placeDesc,
			placeCoords: feature.properties?.placeCoords,
			placeImages: feature.properties?.placeImages,
			tripId: feature.properties?.tripId,
		}));
