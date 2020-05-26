import React, { useState, useEffect, SetStateAction } from 'react';
import {
	MapState,
	MapConfig,
	MarkerToAdd,
	Coords,
	Place,
} from '../../../redux/map/map.types';
import { Map, FeatureGroup, Marker, Polyline, Polygon } from 'react-leaflet';
import {
	DropDownWrapper,
	Wrapper,
	SaveIconWrapper,
} from './leaflet-map.styles';
import {
	EditControl,
	GeoJSON,
	MarkerCoordinates,
	PolylineCoordinates,
	Feature,
	PolygonCoordinates,
	CreatedEvent,
} from 'react-leaflet-draw';
import DropDown from '../../drop-down/drop-down';
import { ReactComponent as SaveIcon } from '../../../assets/icons/save.svg';
import Popup from '../map-popup/map-popup';
import {
	transformFeaturesForUpload,
	getMapData,
	getProperties,
} from './leaflet-map.util';
import { MapStyle, getMapStyle } from './leaflet-map.themes';

import { getPlacesFromFeatures } from '../map.util';
import { setPlaces } from '../../../redux/root.actions';

export interface Trip {
	id: number;
	tripName: string;
}

interface OwnProps extends Pick<MapState, 'places'> {
	onSave: (features: Feature[]) => void;
	dbFeatures: Feature[];
	setPlaces: typeof setPlaces;
	onChange: React.Dispatch<SetStateAction<boolean>>;
	config: MapConfig;
	withTargetUser?: boolean;
}
type Props = OwnProps;

const initialGeoState: GeoJSON = {
	type: 'FeatureCollection',
	features: [],
};
let editableFG: null | FeatureGroup = null;

const LeafletMap: React.FC<Props> = ({
	places,
	onSave,
	dbFeatures,
	config,
	setPlaces,
	onChange,
	withTargetUser,
}) => {
	const [mapStyle, setMapStyle] = useState<MapStyle>('Light');
	const [geoJson, setGeoJson] = useState<GeoJSON>(initialGeoState);

	console.log('leaflet map');
	useEffect(() => {
		setGeoJson({
			...geoJson,
			features: geoJson.features.map((feature) => ({
				...feature,
				properties: getProperties(feature, places),
			})),
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [places]);

	useEffect(() => {
		const newMarkerAdded: boolean =
			geoJson.features[geoJson.features.length - 1]?.geometry.type === 'Point';

		if (newMarkerAdded) {
			const markersArr = geoJson.features.filter(
				(feature) => feature.geometry.type === 'Point'
			);
			const lastMarker = markersArr[markersArr.length - 1];
			const lastMarkerCoords = lastMarker?.geometry.coordinates;

			if (editableFG && !lastMarker.properties?.placeId) {
				const FG = editableFG.leafletElement;
				FG.eachLayer((layer: any) => {
					if (layer._latlngs) return; // only continue if it's a marker
					if (
						layer._latlng.lat === lastMarkerCoords[0] &&
						layer._latlng.lng === lastMarkerCoords[1]
					) {
						layer.openPopup();
					}
				});
			}
		}
	}, [geoJson]);

	useEffect(() => {
		setGeoJson({
			...geoJson,
			features: dbFeatures,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dbFeatures]);

	useEffect(() => {
		if (editableFG) {
			const FG = editableFG.leafletElement;
			FG.eachLayer((layer: any) => {
				if (layer._latlngs) return; // only continue if it's a marker
				if (
					Object.values(layer._latlng).toString() === config.center.toString()
				) {
					layer.openPopup();
				}
			});
		}
	}, [config.center]);
	const onFeatureGroupReady = (reactFGref: FeatureGroup) => {
		if (reactFGref) {
			editableFG = reactFGref;
		}
	};

	const saveMapData = async () => {
		if (!editableFG) {
			return;
		}

		const FG = editableFG.leafletElement;
		const mapData = getMapData(FG, geoJson);

		const transformedFeatures = transformFeaturesForUpload(mapData.features);
		console.log(transformedFeatures);
		try {
			onSave(transformedFeatures);
		} catch (error) {
			console.log('error saving');
		}

		alert('check firebase');
	};

	const onMarkerCreated = (e: CreatedEvent) => {
		if (!editableFG) {
			return;
		}
		onChange(false);
		if (e.layerType === 'marker') {
			const FG = editableFG.leafletElement;
			setGeoJson(getMapData(FG, geoJson));
		}
	};

	const onEditStop = () => {
		if (!editableFG) {
			return;
		}
		onChange(false);
		const FG = editableFG.leafletElement;
		const updatedState = getMapData(FG, geoJson);
		setGeoJson(updatedState);

		setPlaces(getPlacesFromFeatures(updatedState.features));
	};

	return (
		<Wrapper>
			<Map center={config.center} zoom={config.zoom}>
				{getMapStyle(mapStyle)}

				<FeatureGroup key={Date.now()} ref={onFeatureGroupReady}>
					{!withTargetUser && (
						<EditControl
							onCreated={onMarkerCreated}
							onEditStop={onEditStop}
							onDeleteStop={onEditStop}
							position='topright'
							draw={{
								circle: false,
								rectangle: false,
								circlemarker: false,
								polygon: false,
								polyline: {
									shapeOptions: {
										opacity: 0.2,
										weight: 10,
									},
								},
							}}
						/>
					)}

					{geoJson.features.map((feature) => {
						return mapGeoJsonToLayers(feature);
					})}
				</FeatureGroup>
			</Map>
			<DropDownWrapper>
				<DropDown
					list={['Light', 'Light2', 'Dark']}
					value={mapStyle as string}
					onChangeHandler={setMapStyle}
				/>
			</DropDownWrapper>
			{!withTargetUser && (
				<SaveIconWrapper onClick={saveMapData}>
					<SaveIcon style={{ width: '100%', color: '#464646' }} />
				</SaveIconWrapper>
			)}
		</Wrapper>
	);
};

export default React.memo(LeafletMap);

const mapGeoJsonToLayers = (feature: Feature) => {
	const {
		geometry: { type, coordinates },
		properties,
	} = feature;
	const hasPlace = !!properties?.placeName;
	const place: Place | false = hasPlace && getPlacesFromFeatures([feature])[0];
	const markerToAdd: MarkerToAdd | false = !hasPlace && {
		markerId: properties?.id as number,
		markerCoords: coordinates as Coords,
	};
	const popupProps = {
		...(place && { place }),
		...(markerToAdd && { markerToAdd }),
	};
	switch (type) {
		case 'Point':
			return (
				<Marker
					key={properties!.id}
					position={coordinates as MarkerCoordinates}
				>
					<Popup {...popupProps}></Popup>
				</Marker>
			);

		case 'LineString':
			return (
				<Polyline
					key={properties!.id}
					weight={10}
					opacity={0.2}
					positions={coordinates as PolylineCoordinates}
				/>
			);

		case 'Polygon':
			return (
				<Polygon
					key={properties!.id}
					positions={coordinates as PolygonCoordinates}
				/>
			);
	}
};
