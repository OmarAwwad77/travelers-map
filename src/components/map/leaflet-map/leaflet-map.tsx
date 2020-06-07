import React, { useState, useEffect, SetStateAction, ChangeEvent } from 'react';
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
	LocateMe,
	LocateMeIcon,
	AddPlaceByName,
	PlaceInputResults,
	ModelClose,
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
	locateMe,
	fetchPlaceByAddress,
	addMarkerProgrammatically,
} from './leaflet-map.util';
import { MapStyle, getMapStyle } from './leaflet-map.themes';
import { getPlacesFromFeatures } from '../map.util';
import { setPlaces } from '../../../redux/root.actions';
import { TileLayer } from 'react-leaflet';

/**
 *
 */

export interface Trip {
	id: number;
	tripName: string;
}

export interface PlaceInputResults {
	[key: string]: { lat: number; lng: number };
}

interface OwnProps extends Pick<MapState, 'places'> {
	onSave: (features: Feature[]) => void;
	dbFeatures: Feature[];
	setPlaces: typeof setPlaces;
	onChange: React.Dispatch<SetStateAction<boolean>>;
	config: MapConfig;
	withTargetUser?: boolean;
	markersToAdd?: Coords[];
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
	markersToAdd,
}) => {
	const [mapStyle, setMapStyle] = useState<MapStyle>('Light');
	const [geoJson, setGeoJson] = useState<GeoJSON>(initialGeoState);
	const [throttle, setThrottle] = useState<{
		till: number;
		timeout: number | null;
	}>({ till: 0, timeout: null });
	const [placeInput, setPlaceInput] = useState('');
	const [placeInputResults, setPlaceInputResults] = useState<PlaceInputResults>(
		{}
	);
	const [showInputResults, setShowInputResults] = useState(false);
	const [mapConfig, setMapConfig] = useState(config);

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
		setMapConfig(config);
		x();
	}, [config]);

	useEffect(() => {
		if (markersToAdd?.length) {
			setGeoJson({ ...geoJson });
		}
	}, [markersToAdd]);

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
		x();
	}, [mapConfig]);

	const onFeatureGroupReady = (reactFGref: FeatureGroup) => {
		if (reactFGref) {
			editableFG = reactFGref;
			// x();
		}
	};

	const x = () => {
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
	};

	const saveMapData = async () => {
		if (!editableFG) {
			return;
		}

		const FG = editableFG.leafletElement;
		const mapData = getMapData(FG, geoJson, true);

		const transformedFeatures = transformFeaturesForUpload(mapData.features);
		try {
			onSave(transformedFeatures);
		} catch (error) {}

		onChange(true);
		alert('Changes Saved');
	};

	const addMyCurrentLocation = () => {
		onChange(false);

		locateMe(geoJson, setMapConfig, setGeoJson);
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

	const saveChanges = (editing?: boolean) => {
		if (!editableFG) {
			return;
		}
		onChange(false);
		const FG = editableFG.leafletElement;
		const updatedState = getMapData(FG, geoJson, editing);
		setGeoJson(updatedState);

		setPlaces(getPlacesFromFeatures(updatedState.features));
	};

	const onEditStop = () => {
		saveChanges(true);
	};

	const onDeleteStop = () => {
		saveChanges();
	};

	const placeNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const now = Date.now();
		const val = e.target.value;
		setPlaceInput(val);
		if (throttle.till >= now) clearTimeout(throttle.timeout!);
		const timeout = setTimeout(() => {
			fetchPlaceByAddress(val).then((results) => {
				setPlaceInputResults(results);
				setShowInputResults(true);
			});
		}, 500);
		setThrottle({ till: now + 500, timeout });
	};

	const onResultClicked = (key: string) => {
		if (!showInputResults) return;
		setMapConfig({
			center: [placeInputResults[key].lat, placeInputResults[key].lng],
			zoom: 9,
		});
		onChange(false);
		setGeoJson(
			addMarkerProgrammatically(geoJson, [
				placeInputResults[key].lat,
				placeInputResults[key].lng,
			])
		);
		setShowInputResults(false);
	};

	return (
		<Wrapper>
			<Map center={mapConfig.center} zoom={mapConfig.zoom}>
				{/* {getMapStyle(mapStyle)} */}
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>

				<FeatureGroup key={Date.now()} ref={onFeatureGroupReady}>
					{!withTargetUser && (
						<EditControl
							onCreated={onMarkerCreated}
							onEditStop={onEditStop}
							onDeleteStop={onDeleteStop}
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
						return mapGeoJsonToLayers(feature, withTargetUser);
					})}
				</FeatureGroup>
			</Map>
			<DropDownWrapper>
				<DropDown
					list={['Light', 'Light2', 'Dark']}
					value={mapStyle as string}
					onChangeHandler={(val: MapStyle) => {
						saveChanges();
						setMapStyle(val);
					}}
				/>
			</DropDownWrapper>
			{!withTargetUser && (
				<>
					<LocateMe onClick={addMyCurrentLocation}>
						Add My Location <LocateMeIcon />
					</LocateMe>
					<AddPlaceByName
						onFocus={() => {
							saveChanges();
							setShowInputResults(true);
						}}
						// onBlur={() => setShowInputResults(false)}
						value={placeInput}
						onChange={placeNameOnChange}
						placeholder='add place by name'
					/>
					<PlaceInputResults show={showInputResults}>
						<ModelClose onClick={() => setShowInputResults(false)} />
						{Object.keys(placeInputResults).map((key) => (
							<span key={key} onClick={() => onResultClicked(key)}>
								{key}
							</span>
						))}
						{Object.keys(placeInputResults).length === 0 && (
							<span>no results</span>
						)}
					</PlaceInputResults>
				</>
			)}
			{!withTargetUser && (
				<SaveIconWrapper onClick={saveMapData}>
					<SaveIcon style={{ width: '100%', color: '#fff' }} />
				</SaveIconWrapper>
			)}
		</Wrapper>
	);
};

export default React.memo(LeafletMap);

const mapGeoJsonToLayers = (feature: Feature, withTargetUser?: boolean) => {
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
					<Popup withTargetUser={withTargetUser} {...popupProps}></Popup>
				</Marker>
			);

		case 'LineString':
			return (
				<Polyline
					key={Math.random()}
					weight={10}
					opacity={0.2}
					positions={coordinates as PolylineCoordinates}
				/>
			);
	}
};
