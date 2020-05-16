import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import WithModel from '../../hoc/with-model/with-model';
import { MapState } from '../../redux/map/map.types';
import { AppState } from '../../redux/root.reducer';
import { selectPlaces } from '../../redux/map/map.selectors';
import Slider from '../slider/slider';
import {
	Wrapper,
	PlaceName,
	PlaceDesc,
	DescTitle,
	AddressTitle,
} from './place-details.styles';

interface LinkStateToProps extends Pick<MapState, 'places'> {}
type OwnProps = {};
type Props = OwnProps & LinkStateToProps;

const PlaceDetails: React.FC<Props> = ({ places }) => {
	const [address, setAddress] = useState<string>();
	useEffect(() => {
		fetch(
			`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=0c29999ba52f470c8a5e04f8b053e77f`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data.results[0]);
				const add = data.results[0].formatted;
				setAddress(add);
			});
	}, []);

	const { placeId } = useParams<{ placeId: string }>();
	const place = places.find((place) => place.placeId === +placeId);
	const { placeName, placeImages, placeDesc, placeCoords } = place!;

	const lat = (placeCoords as [number, number])[0];
	const lng = (placeCoords as [number, number])[1];

	return (
		<WithModel>
			<Wrapper>
				<PlaceName>{placeName}</PlaceName>
				<Slider
					urls={placeImages}
					width='100%'
					height='0'
					paddingTop='60.25%'
				/>
				<div>
					<DescTitle>Place Description</DescTitle>
					<PlaceDesc>{placeDesc}</PlaceDesc>
				</div>
				<div>
					<AddressTitle>Address</AddressTitle>
					<span>{address}</span>
				</div>
			</Wrapper>
		</WithModel>
	);
};

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	places: selectPlaces,
});

export default connect(mapStateToProps)(PlaceDetails);
