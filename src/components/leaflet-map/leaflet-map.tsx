import React, { useState, useEffect } from 'react';
import { Map, FeatureGroup, Marker, Polyline, Polygon } from 'react-leaflet';
import {
	DropDownWrapper,
	Wrapper,
	SaveIconWrapper,
} from './leaflet-map.styles';
import {
	EditControl,
	StateType,
	MarkerCoordinates,
	PolylineCoordinates,
	Feature,
	PolygonCoordinates,
} from 'react-leaflet-draw';
import DropDown from '../drop-down/drop-down';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as SaveIcon } from '../../assets/icons/save.svg';
import { db } from '../../firebase/firebase.utils';
import Popup from '../map-popup/map-popup';
import {
	transformFeaturesForMap,
	transformFeaturesForUpload,
	getReversedCoords,
	getMapData,
} from './leaflet-map.util';
import { MapStyle, getMapStyle } from './leaflet-map.themes';

const initialGeoState: StateType = {
	type: 'FeatureCollection',
	features: [],
};
let editableFG: null | FeatureGroup = null;

const LeafletMap = () => {
	const [mapStyle, setMapStyle] = useState<MapStyle>('Light');
	const [geoJson, setGeoJson] = useState<StateType>(initialGeoState);

	useEffect(() => {
		const fetchMapData = async () => {
			const doc = await db.collection('features').doc('1').get();

			if (doc.exists) {
				const features = doc.data()?.userFeatures ?? [];

				const transformedFeatures = transformFeaturesForMap(features);

				setGeoJson({
					...geoJson,
					features: transformedFeatures,
				});
			}
		};

		fetchMapData();
	}, []);

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

		await db
			.collection('features')
			.doc('1') // userId
			.set({
				userFeatures: transformedFeatures,
			});

		alert('check firebase');
	};

	const onMarkerCreated = () => {
		if (!editableFG) {
			return;
		}
		const FG = editableFG.leafletElement;
		setGeoJson(getMapData(FG, geoJson));
	};

	return (
		<Wrapper>
			<Map center={[51.51, -0.06]} zoom={5}>
				{getMapStyle(mapStyle)}
				<FeatureGroup key={uuidv4()} ref={onFeatureGroupReady}>
					<EditControl
						onCreated={onMarkerCreated}
						position='topright'
						draw={{
							circle: false,
							rectangle: false,
							circlemarker: false,
							polyline: {
								shapeOptions: {
									opacity: 0.2,
									weight: 10,
								},
							},
						}}
					/>
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
			<SaveIconWrapper onClick={saveMapData}>
				<SaveIcon style={{ width: '100%' }} />
			</SaveIconWrapper>
		</Wrapper>
	);
};

export default LeafletMap;

const mapGeoJsonToLayers = ({
	geometry: { type, coordinates },
	properties,
}: Feature) => {
	switch (type) {
		case 'Point':
			return (
				<Marker
					key={properties!.id}
					position={coordinates as MarkerCoordinates}
				>
					<Popup
						url={'https://i.picsum.photos/id/866/400/300.jpg'}
						layerId={properties!.id}
					></Popup>
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
