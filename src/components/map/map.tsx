import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../redux/root.reducer';
import styled from 'styled-components';
import LeafletMap from './leaflet-map/leaflet-map';
import { MapState, Trip, Place } from '../../redux/map/map.types';
import {
	selectPlaces,
	selectTrips,
	selectMapConfig,
} from '../../redux/map/map.selectors';
import { Feature } from 'react-leaflet-draw';
import { db } from '../../firebase/firebase.utils';
import { transformFeaturesForMap } from './leaflet-map/leaflet-map.util';
import { Dispatch } from 'redux';
import { StoreActions, setTrips, setPlaces } from '../../redux/root.actions';
import SideBar, { SideBarTrip } from '../side-bar/side-bar';
import { getSideBarTrips, getPlacesFromFeatures } from './map.util';

const Wrapper = styled.div`
	position: relative;
	height: 100vh;
	overflow: hidden;
`;

interface LinkStateToProps extends Omit<MapState, 'markerToAdd'> {}
interface LinkDispatchToProps {
	setTrips: typeof setTrips;
	setPlaces: typeof setPlaces;
}
interface OwnProps {}
type Props = LinkStateToProps & OwnProps & LinkDispatchToProps;

const userId = '1';

const Map: React.FC<Props> = ({
	places,
	trips,
	setTrips,
	setPlaces,
	config,
}) => {
	const [dbFeatures, setDbFeatures] = useState<Feature[]>([]);
	const [sideBarTrips, setSideBarTrips] = useState<SideBarTrip[]>([]);

	useEffect(() => {
		const fetchMapData = async () => {
			const featuresDoc = await db.collection('features').doc(userId).get();

			const tripsDoc = await db.collection('trips').doc(userId).get();

			if (featuresDoc.exists) {
				const features = featuresDoc.data()?.userFeatures ?? [];

				const transformedFeatures = transformFeaturesForMap(features);

				setDbFeatures(transformedFeatures);
				setPlaces(getPlacesFromFeatures(transformedFeatures));
			}
			if (tripsDoc.exists) {
				const trips: Trip[] = tripsDoc.data()?.userTrips ?? [];
				setTrips(trips);
			}
		};

		// fetchMapData();
	}, []);

	useEffect(() => {
		setSideBarTrips(getSideBarTrips(places, trips));
	}, [trips, places]);

	const onSave = async (features: Feature[]) => {
		await db.collection('features').doc(userId).set({
			userFeatures: features,
		});
		await db.collection('trips').doc(userId).set({
			userTrips: trips,
		});
	};

	return (
		<>
			<SideBar trips={sideBarTrips} />
			<Wrapper>
				<LeafletMap
					places={places}
					dbFeatures={dbFeatures}
					onSave={onSave}
					setPlaces={setPlaces}
					{...config}
				/>
			</Wrapper>
		</>
	);
};

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	places: selectPlaces,
	trips: selectTrips,
	config: selectMapConfig,
});

const mapDispatchToProps = (
	dispatch: Dispatch<StoreActions>
): LinkDispatchToProps => ({
	setTrips: (trips: Trip[]) => dispatch(setTrips(trips)),
	setPlaces: (places: Place[]) => dispatch(setPlaces(places)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
