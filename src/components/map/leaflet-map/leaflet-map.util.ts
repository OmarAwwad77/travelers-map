import { Feature, GeoJSON } from 'react-leaflet-draw';
import { FeatureGroup } from 'leaflet';
import { Dispatch, SetStateAction } from 'react';
import { Place, MapConfig } from '../../../redux/map/map.types';
import { v4 as uuidv4 } from 'uuid';
import { PlaceInputResults } from './leaflet-map';

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

const matchLayerToState = (
	feature: Feature,
	id: number,
	state: GeoJSON
): Feature => {
	const featureCoords = getReversedCoords(
		feature.geometry.coordinates.map((val: number) => val.toFixed(2))
	);
	const stateLayer = state.features.find(
		(feature) =>
			feature.geometry.coordinates
				.map((val: number) => val.toFixed(2))
				.toString() === featureCoords.toString()
	);
	console.log(
		featureCoords.toString(),
		state.features.map((f) => f.geometry.coordinates.toString())
	);
	if (stateLayer) {
		return {
			...feature,
			properties: stateLayer.properties,
			geometry: stateLayer.geometry,
		};
	} else {
		return {
			...feature,
			properties: { id },
			geometry: {
				...feature.geometry,
				coordinates: getReversedCoords(feature.geometry.coordinates),
			},
		};
	}
};

export const getMapData = (
	FG: FeatureGroup,
	state: GeoJSON,
	editing?: boolean
): GeoJSON => {
	const ids: number[] = [];
	FG.eachLayer((layer: any) => {
		ids.push(layer._leaflet_id);
	});

	const geoJsonData = FG.toGeoJSON() as GeoJSON;
	console.log(geoJsonData.features, ids);
	return {
		...geoJsonData,
		features: geoJsonData.features.map((feature, i) => {
			if (!editing) return matchLayerToState(feature, ids[i], state);
			return {
				...feature,
				properties:
					feature.geometry.type === 'LineString'
						? feature.properties
						: {
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
			};
		}),
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

export const locateMe = (
	state: GeoJSON,
	setMapConfig: Dispatch<SetStateAction<MapConfig>>,
	setState: Dispatch<SetStateAction<GeoJSON>>
) => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(({ coords }) => {
			const updatedState = addMarkerProgrammatically(state, [
				coords.latitude,
				coords.longitude,
			]);
			setMapConfig({
				center: [coords.latitude, coords.longitude],
				zoom: 9,
			});
			setState(updatedState);
		});
	} else {
		alert('Geolocation is not supported by this browser.');
	}
};

export const addMarkerProgrammatically = (
	state: GeoJSON,
	coords: Coords
): GeoJSON => {
	return {
		...state,
		features: [
			...state.features,
			{
				type: 'Feature',
				properties: {
					id: uuidv4(),
				},
				geometry: {
					type: 'Point',
					coordinates: coords,
				},
			},
		],
	};
};

export const fetchPlaceByAddress = async (address: string) => {
	const res = await fetch(
		`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=0c29999ba52f470c8a5e04f8b053e77f`
	);
	const data = await res.json();
	const fetchedResults: {
		formatted: string;
		components: { country: string; city?: string; state?: string };
		geometry: { lat: number; lng: number };
	}[] = data.results;

	const results: PlaceInputResults = {};
	for (let place of fetchedResults) {
		results[
			`${place.components.country}, ${
				place.components.city ?? place.components.state
			}`
		] = place.geometry;
	}
	return results;
};
