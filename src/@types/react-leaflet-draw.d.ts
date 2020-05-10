declare module 'react-leaflet-draw' {
	import {
		Circle,
		CircleMarker,
		Marker,
		Polygon,
		Polyline,
		Rectangle,
		LayerGroup,
		Lang,
	} from 'react-leaflet';
	import {
		LeafletEvent,
		Layer,
		LeafletMouseEvent,
		LatLngTuple,
		LatLngExpression,
		LatLng,
	} from 'leaflet';
	import {
		Geometry,
		GeoJsonTypes,
		Feature as GeoFeature,
		Position as GeoPosition,
	} from 'geojson';

	type Position = 'topright' | 'topleft' | 'bottomright' | 'bottomleft';
	type DrawShapesValue = Object | boolean;
	type DrawShapesKeys =
		| 'polyline'
		| 'rectangle'
		| 'circle'
		| 'circlemarker'
		| 'marker'
		| 'polygon';
	type Draw = {
		[key in DrawShapesKeys]?: DrawShapesValue;
	};

	type Layer = Circle | CircleMarker | Marker | Polygon | Polyline | Rectangle;

	interface LayerExtended extends Layer {
		feature: Feature;
	}

	export type PolylineCoordinates = LatLngExpression[] | LatLngExpression[][];

	export type PolygonCoordinates = PolylineCoordinates | LatLngExpression[][][];

	export type MarkerCoordinates = LatLngTuple;

	interface Feature extends GeoFeature {
		geometry: {
			coordinates: any[];
			type: GeoJsonTypes;
		};
	}

	export interface MouseEvent extends LeafletMouseEvent {
		layer: LayerExtended;
		target: LayerExtended;
	}

	export interface StateType {
		type: 'FeatureCollection';
		features: Feature[];
	}

	export interface CreatedEvent extends LeafletEvent {
		layer: any;

		layerType: string;
	}

	export interface Props {
		position: Position;
		draw: Draw;
		onEdited?: (e: { layers: LayerGroup }) => void;
		onCreated?: (e: CreatedEvent) => void;
		onDeleted?: () => void;
		onEditStart?: function;
	}

	export class EditControl extends React.Component<Props, any> {}
}
