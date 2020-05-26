import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import WithModel from '../../hoc/With-model/With-model';
import { MapState, Coords } from '../../redux/map/map.types';
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
import { Post } from '../../redux/news-feed/news-feed.types';

interface LinkStateToProps extends Pick<MapState, 'places'> {}
type OwnProps = {
	post?: Post;
	backDropOnClick?: () => void;
};
type Props = OwnProps & LinkStateToProps;

const PlaceDetails: React.FC<Props> = ({ places, post, backDropOnClick }) => {
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

	let placeName: string;
	let placeImages: string[];
	let placeDesc: string;
	let placeCoords: Coords;

	if (!post) {
		const place = places.find((place) => place.placeId === +placeId)!;
		placeName = place.placeName;
		placeImages = place.placeImages;
		placeCoords = place.placeCoords;
		placeDesc = place.placeDesc;

		// const { placeName, placeImages, placeDesc, placeCoords } = place!;
	} else {
		placeName = post.placeName;
		placeImages = post.placeImages;
		placeCoords = post.placeCoords;
		placeDesc = post.placeDesc;
	}
	const lat = (placeCoords as [number, number])[0];
	const lng = (placeCoords as [number, number])[1];

	return (
		<WithModel backDropOnClick={post && backDropOnClick}>
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
