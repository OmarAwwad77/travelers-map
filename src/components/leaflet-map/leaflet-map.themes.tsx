import React from 'react';
import { TileLayer } from 'react-leaflet';

export type MapStyle = 'Dark' | 'Light' | 'Light2';

export const getMapStyle = (style: MapStyle) => {
	switch (style) {
		case 'Light':
			return light;
		case 'Light2':
			return light2;
		case 'Dark':
			return dark;
	}
};

const dark = (
	<TileLayer
		url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
		attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
	/>
);

const light = (
	<TileLayer
		url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
		attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
	/>
);

const light2 = (
	<TileLayer
		url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
		attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
	/>
);
