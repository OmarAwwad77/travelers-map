import React from 'react';
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
	layerId?: number;
}

const Popup: React.FC<Props> = ({ url, layerId }) => {
	const { path } = useRouteMatch();
	const { push } = useHistory();

	return (
		<LeafletPopup>
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
				<AddPlaceLink onClick={() => push(`${path}/add-place`)}>
					Add a Place
				</AddPlaceLink>
			)}
		</LeafletPopup>
	);
};

export default Popup;
