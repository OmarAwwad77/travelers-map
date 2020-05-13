import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Popup as LeafletPopup } from 'react-leaflet';

export const ImgWrapper = styled.div<{ url: string }>`
	width: 35rem;
	height: 25rem;
	background: url(${(p) => p.url}) center/cover no-repeat;
`;

export const AddPlaceLink = styled.a`
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`;

interface Props {
	url?: string;
	layerId: number;
	coords: any[];
}

const Popup: React.FC<Props> = ({ url, layerId, coords }) => {
	const { path } = useRouteMatch();
	const { push } = useHistory();

	return (
		<LeafletPopup minWidth={350}>
			{url ? (
				<>
					<div style={{ display: 'inline-block', margin: '0 auto' }}>
						{layerId}
					</div>
					<ImgWrapper url={url} />
					<a target='_black' href='https://www.google.com'>
						click here
					</a>
				</>
			) : (
				<AddPlaceLink
					onClick={() => push(`${path}/add-place/${layerId}/${coords}`)}
				>
					Add a Place
				</AddPlaceLink>
				// <AddPlace
				// 	coordsArr={coords}
				// 	placeId={layerId!}
				// 	setTrips={setTrips}
				// 	setGeoJson={setGeoJson}
				// />
			)}
		</LeafletPopup>
	);
};

export default Popup;
