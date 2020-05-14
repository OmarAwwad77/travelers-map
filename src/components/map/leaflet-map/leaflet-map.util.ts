import { Feature, GeoJSON } from 'react-leaflet-draw';
import { FeatureGroup } from 'leaflet';
import { Dispatch, SetStateAction } from 'react';
import { Place } from '../../../redux/map/map.types';

type NestedCoords = number[][];
type FlatCoords = number[];
type Coords = FlatCoords | NestedCoords;

export const reverseCords = (arr: Coords): any[] => {
	if (!Array.isArray(arr[0])) {
		// not nested
		return [...arr].reverse();
	} else {
		// nested
		return (arr as NestedCoords).map((arrVal) => reverseCords(arrVal));
	}
};

export const getReversedCoords = (coords: any[]) => {
	if (!Array.isArray(coords[0])) return [...coords].reverse();
	return coords.map((coords) => reverseCords(coords));
};

const turnNestedArrIntoObj = (arr: any[]) => {
	let obj: { [key: string]: [] } = {};

	arr.forEach((value, i) => {
		obj[i] = value;
	});

	return obj;
};

export const transformFeaturesForUpload = (features: Feature[]): Feature[] =>
	features.map((feature) => ({
		...feature,
		geometry: {
			...feature.geometry,
			coordinates: feature.geometry.coordinates.map((val) => {
				if (!Array.isArray(val)) {
					return val;
				}

				return turnNestedArrIntoObj(val);
			}),
		},
	}));

export const transformFeaturesForMap = (features: Feature[]): Feature[] =>
	features.map((feature: any) => ({
		...feature,
		geometry: {
			...feature.geometry,
			coordinates: feature.geometry.coordinates.map((val: any) => {
				if (!(typeof val === 'object' && val !== null)) {
					return val;
				}
				return Object.values(val);
			}),
		},
	}));

export const getMapData = (FG: FeatureGroup, state: GeoJSON): GeoJSON => {
	const ids: number[] = [];
	FG.eachLayer((layer: any) => {
		ids.push(layer._leaflet_id);
	});

	const geoJsonData = FG.toGeoJSON() as GeoJSON;

	return {
		...geoJsonData,
		features: geoJsonData.features.map((feature, i) => ({
			...feature,
			properties: {
				...state.features[i]?.properties,
				id: state.features[i]?.properties?.id ?? ids[i],
				...(state.features[i]?.properties?.placeCoords && {
					placeCoords: getReversedCoords(feature.geometry.coordinates),
				}),
			},
			geometry: {
				...feature.geometry,
				coordinates: getReversedCoords(feature.geometry.coordinates),
			},
		})),
	};
};

export const getProperties = (feature: Feature, places: Place[]) => {
	// if (feature.geometry.coordinates.join(',') === coords.join(',')) {
	// 	return {
	// 		...feature.properties,
	// 		...place,
	// 	};
	// } else {
	// 	return feature.properties;
	// }
	if (feature.geometry.type !== 'Point') return feature.properties;
	const place = places.find(
		(place) => place.placeId === feature.properties?.id
	);
	if (place) {
		return {
			...feature.properties,
			...place,
		};
	} else {
		return feature.properties;
	}
};
