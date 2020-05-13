import React from 'react';
import { Place, Trip } from '../../redux/map/map.types';
import { Wrapper } from './side-bar.styles';
import UserTrip from '../user-trip/user-trip';

export interface SideBarTrip extends Trip {
	places: Place[];
}

interface OwnProps {
	trips: SideBarTrip[];
}
type Props = OwnProps;

const SideBar: React.FC<Props> = ({ trips }) => {
	return (
		<Wrapper>
			{trips.map(({ places, tripName, tripId }) => (
				<UserTrip name={tripName} key={tripId} places={places} />
			))}
		</Wrapper>
	);
};

export default SideBar;
