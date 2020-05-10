import { Feature, StateType } from 'react-leaflet-draw';
import { FeatureGroup } from 'leaflet';
import { Dispatch, SetStateAction } from 'react';

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

export const transformFeaturesForUpload = (features: Feature[]): Feature[] =>
	features.map((feature: any) => ({
		...feature,
		geometry: {
			...feature.geometry,
			coordinates: feature.geometry.coordinates.map((val: any) => {
				if (!Array.isArray(val)) {
					return val;
				}
				let obj: { [key: string]: [] } = {};

				val.forEach((value, i) => {
					obj[i] = value;
				});

				return obj;
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

export const getMapData = (FG: FeatureGroup, state: StateType): StateType => {
	const ids: number[] = [];
	FG.eachLayer((layer: any) => {
		console.log(layer);
		ids.push(layer._leaflet_id);
	});

	const geoJsonData = FG.toGeoJSON() as StateType;

	return {
		...geoJsonData,
		features: geoJsonData.features.map((feature, i) => ({
			...feature,
			properties: { id: state.features[i]?.properties?.id ?? ids[i] },
			geometry: {
				...feature.geometry,
				coordinates: getReversedCoords(feature.geometry.coordinates),
			},
		})),
	};
};
