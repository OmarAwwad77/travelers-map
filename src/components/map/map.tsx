import React from 'react';
import styled from 'styled-components';
import LeafletMap from '../leaflet-map/leaflet-map';

const Wrapper = styled.div`
	position: relative;
	height: 100vh;
	overflow: hidden;
`;

const Map = () => {
	return (
		<Wrapper>
			<SideBar />
			<LeafletMap />;
		</Wrapper>
	);
};
export default Map;

const SideBarWrapper = styled.div`
	position: absolute;
	z-index: 2;
	left: 0;
	top: 0;
	background: #fff;
	max-width: 70%;
	width: 25rem;
	height: 100%;
	overflow-y: auto;
`;

const SideBar = () => {
	return <SideBarWrapper />;
};
