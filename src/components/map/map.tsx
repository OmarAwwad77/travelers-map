import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Prompt, useLocation, useHistory, Route } from 'react-router-dom';
import { AppState } from '../../redux/root.reducer';
import LeafletMap from './leaflet-map/leaflet-map';
import { MapState, Trip, Coords } from '../../redux/map/map.types';
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
import AddPlace from '../add-place/add-place';
import PlaceDetails from '../place-details/place-details';
import SideBar, { SideBarTrip } from './sidebar/sidebar';
import { getSideBarTrips, getPlacesFromFeatures } from './map.util';
import MenuIcon from '../menu-icon/menu-icon';
import { selectUser } from '../../redux/user/user.selectors';
import { UserState } from '../../redux/user/user.types';
import { BackButton, Wrapper, MenuIconWrapper } from './map.styles';

/**
 *
 */

interface LinkStateToProps
	extends Omit<MapState, 'markerToAdd'>,
		Pick<UserState, 'user'> {}
interface LinkDispatchToProps {
	setTrips: typeof setTrips;
	setPlaces: typeof setPlaces;
}
interface OwnProps {
	targetUserId?: string;
	placeToShow?: Coords;
}
type Props = LinkStateToProps & OwnProps & LinkDispatchToProps;

/**
 *
 */
const Map: React.FC<Props> = ({
	places,
	trips,
	setTrips,
	setPlaces,
	config,
	targetUserId,
	placeToShow,
	user,
}) => {
	const [dbFeatures, setDbFeatures] = useState<Feature[]>([]);
	const [sideBarTrips, setSideBarTrips] = useState<SideBarTrip[]>([]);
	const [showSideBar, setShowSideBar] = useState(true);
	const [changesSaved, setChangesSaved] = useState(true);

	const { pathname } = useLocation();
	const { push } = useHistory();

	const userId = targetUserId ?? user!.uid;
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

		fetchMapData();
	}, []);

	useEffect(() => {
		if (changesSaved) {
			onbeforeunload = null;
		} else {
			onbeforeunload = () => true;
		}
	}, [changesSaved]);

	useEffect(() => {
		setSideBarTrips(getSideBarTrips(places, trips));
	}, [trips, places]);

	const onSave = useCallback(
		async (features: Feature[]) => {
			await db.collection('features').doc(userId).set({
				userFeatures: features,
			});
			await db.collection('trips').doc(userId).set({
				userTrips: trips,
			});
			setChangesSaved(true);
		},
		[trips]
	);

	return (
		<>
			<Route path='/map/add-place' exact component={AddPlace} />
			<Route path='/map/place-details/:placeId' component={PlaceDetails} />
			<Prompt
				message={(loc) =>
					loc.pathname.startsWith('/map')
						? true
						: !changesSaved
						? `Unsaved Changes. Are you sure you want to leave to ${loc.pathname} without saving?`
						: true
				}
			/>
			<BackButton onClick={() => push('/profile')}>&#8592;</BackButton>
			<MenuIconWrapper>
				<MenuIcon
					dir='left'
					toggleSideBar={() => setShowSideBar(!showSideBar)}
				/>
			</MenuIconWrapper>
			<SideBar show={showSideBar} trips={sideBarTrips} />
			<Wrapper withTargetUser={!!targetUserId}>
				<LeafletMap
					withTargetUser={!!targetUserId}
					places={places}
					dbFeatures={dbFeatures}
					onSave={onSave}
					onChange={setChangesSaved}
					setPlaces={setPlaces}
					config={placeToShow ? { center: placeToShow, zoom: 7 } : config}
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
	user: selectUser,
});

const mapDispatchToProps = (
	dispatch: Dispatch<StoreActions>
): LinkDispatchToProps => ({
	setTrips: (trips) => dispatch(setTrips(trips)),
	setPlaces: (places) => dispatch(setPlaces(places)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
