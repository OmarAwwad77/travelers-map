import React, { useState } from 'react';
import styled from 'styled-components';
import { Popup as LeafletPopup } from 'react-leaflet';

export const ImgWrapper = styled.div<{ url: string }>`
	width: 35rem;
	height: 25rem;
	background: url(${(p) => p.url}) center/cover no-repeat;
`;

interface Props {
	url: string;
	layerId: number;
}

const Popup: React.FC<Props> = ({ url, layerId }) => {
	const [show, setShow] = useState(true);
	return (
		<LeafletPopup minWidth={350}>
			<div style={{ display: 'inline-block', margin: '0 auto' }}>{layerId}</div>
			<ImgWrapper url={url} />
			{show && (
				<a target='_black' href='https://www.google.com'>
					click here
				</a>
			)}
			<button onClick={() => setShow(!show)}>Toggle</button>
		</LeafletPopup>
	);
};

export default Popup;
