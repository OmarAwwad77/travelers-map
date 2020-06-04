import React, { useEffect } from 'react';
import styled from 'styled-components';
import WithModel from '../../hoc/With-model/With-model';
import Map from '../map/map';
import { Coords } from '../../redux/map/map.types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setMapConfig } from '../../redux/root.actions';

const Wrapper = styled.div`
	width: 80vw;
	height: 70vh;

	.leaflet-container {
		width: 100%;
		height: 100%;
	}
`;

interface LinkDispatchToProps {
	setMapConfig: typeof setMapConfig;
}
interface OwnProps {
	targetUserId: string;
	placeToShow: Coords;
	backDropOnClick: () => void;
}
type Props = OwnProps & LinkDispatchToProps;
const ViewOnMap: React.FC<Props> = ({
	targetUserId,
	setMapConfig,
	placeToShow,
	backDropOnClick,
}) => {
	useEffect(() => {
		setMapConfig({
			zoom: 4,
			center: placeToShow,
		});
	}, []);
	return (
		<WithModel backDropOnClick={backDropOnClick}>
			<Wrapper>
				<Map targetUserId={targetUserId} />
			</Wrapper>
		</WithModel>
	);
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	setMapConfig: (config) => dispatch(setMapConfig(config)),
});

export default connect(null, mapDispatchToProps)(ViewOnMap);
