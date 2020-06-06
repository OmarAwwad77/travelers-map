import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import {
	Wrapper,
	TripNameWrapper,
	DropDownWrapper,
	TripInput,
	Or,
	TripDescription,
	ImageUploadsWrapper,
	SaveButton,
	PlaceName,
	PlaceAddress,
} from './add-place.styles';
import WithModel from '../../hoc/With-model/With-model';
import DropDown from '../drop-down/drop-down';
import ImageUpload from '../image-upload/image-upload';
import {
	setImageUploadError,
	updateImageUploads,
	getFileDataUrl,
} from './add-place.util';
import { uploadImage } from '../../firebase/firebase.utils';
import {
	StoreActions,
	addPlace,
	addTrip,
	setMarkerToAdd,
	loadingStart,
} from '../../redux/root.actions';
import { Coords, MapState } from '../../redux/map/map.types';
import { AppState } from '../../redux/root.reducer';
import {
	selectTrips,
	selectMarkerToAdd,
	selectLoading,
	selectSideBarTrips,
} from '../../redux/map/map.selectors';
import { selectUserId } from '../../redux/user/user.selectors';
import Spinner from '../spinner/spinner';
import { SideBarTrip } from '../map/sidebar/sidebar';

export type Ids = 'main' | 'extra1';
export type ImageUpload = {
	id: Ids;
	file: File | null;
	url: string;
	loading: boolean;
	errorMessage: string | null;
};

const defaultOption = 'choose a trip';

interface OwnProps {}

interface LinkDispatchToProps {
	loadingStart: typeof loadingStart;
	addPlace: typeof addPlace;
	addTrip: typeof addTrip;
	setMarkerToAdd: typeof setMarkerToAdd;
}
interface LinkStateToProps
	extends Pick<MapState, 'trips' | 'markerToAdd' | 'loading'> {
	userId: string;
	sidebarTrips: SideBarTrip[];
}

type Props = OwnProps & LinkDispatchToProps & LinkStateToProps;
const AddPlace: React.FC<Props> = ({
	loadingStart,
	loading,
	addPlace,
	addTrip,
	trips,
	markerToAdd,
	setMarkerToAdd,
	userId,
	sidebarTrips,
}) => {
	const [tripDropdown, setTripDropdown] = useState(defaultOption);
	const [tripOptions, setTripOptions] = useState<string[]>([]);
	const [tripInput, setTripInput] = useState('');
	const [placeName, setPlaceName] = useState('');
	const [placeAddress, setPlaceAddress] = useState('');
	const [description, setDescription] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const [imageUploads, setImageUploads] = useState<ImageUpload[]>([
		{
			id: 'main',
			file: null,
			url: '',
			loading: false,
			errorMessage: null,
		},
		{
			id: 'extra1',
			file: null,
			url: '',
			loading: false,
			errorMessage: null,
		},
	]);

	useEffect(() => {
		const tripInputEmpty = tripInput === '';
		const tripDropdownUntouched = tripDropdown === defaultOption;
		const tripNameEmpty = tripDropdownUntouched && tripInputEmpty;
		const placeNameEmpty = placeName === '';
		const placeAddressEmpty = placeAddress === '';
		const descriptionEmpty = description === '';
		const mainImageEmpty =
			imageUploads.find((image) => image.id === 'main')?.file === null;

		if (
			tripNameEmpty ||
			descriptionEmpty ||
			mainImageEmpty ||
			placeNameEmpty ||
			placeAddressEmpty
		) {
			setIsFormValid(false);
		} else {
			setIsFormValid(true);
		}
	}, [
		imageUploads,
		description,
		tripInput,
		tripDropdown,
		placeName,
		placeAddress,
	]);

	useEffect(() => {
		async function fetchAddress() {
			const [lat, lng] = markerToAdd?.markerCoords as number[];

			const res = await fetch(
				`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=0c29999ba52f470c8a5e04f8b053e77f`
			);

			const data = await res.json();
			setPlaceAddress(data.results[0].formatted);
		}
		fetchAddress();
	}, []);

	useEffect(() => {
		const tripsWithPlaces = sidebarTrips.filter(
			(sidebarTrip) => sidebarTrip.places.length !== 0
		);
		setTripOptions(tripsWithPlaces.map((trip) => trip.tripName));
	}, [sidebarTrips]);

	const placeId = markerToAdd?.markerId!;
	const placeCoords = markerToAdd?.markerCoords!;

	const onImageUploadChange = async (
		e: ChangeEvent<HTMLInputElement>,
		id: Ids
	) => {
		const file = e.target.files![0];
		if (!file) return;

		// set loading state
		setImageUploads(
			updateImageUploads(imageUploads, id, {
				file: null,
				url: '',
				loading: true,
				errorMessage: null,
			})
		);

		// validate file
		const validExts = ['jpg', 'png', 'jpeg'];
		const maxFileSize = 5;

		const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1);
		const fileSize = file.size / 1000000; // size in mb

		if (!validExts.includes(fileExt)) {
			setImageUploads((prevImageUploads) =>
				setImageUploadError(
					prevImageUploads,
					id,
					`invalid file extension. supported extensions (${validExts.join(
						' '
					)})`
				)
			);
			return;
		}

		if (fileSize > maxFileSize) {
			setImageUploads(
				setImageUploadError(
					imageUploads,
					id,
					`Image is too big (max ${maxFileSize}mb)`
				)
			);
			return;
		}

		const dataUrl = await getFileDataUrl(file);

		setImageUploads(
			updateImageUploads(imageUploads, id, {
				file,
				url: dataUrl,
				loading: false,
				errorMessage: null,
			})
		);
	};

	const onImageUploadCancel = (id: Ids) => {
		setImageUploads(
			updateImageUploads(imageUploads, id, {
				loading: false,
				errorMessage: null,
				file: null,
				url: '',
			})
		);
	};

	const onDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setDescription(val);
	};

	const onTripInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setTripInput(val);
	};

	const onPlaceNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setPlaceName(val);
	};

	const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let files: File[] = [];
		imageUploads.forEach((imageUpload, i) => {
			imageUpload.file && files.push(imageUpload.file);
		});

		loadingStart();

		let promises: Promise<string>[] = [];
		files.forEach(async (file) => {
			promises.push(uploadImage(file));
		});
		Promise.all([...promises]).then((urls) => {
			let tripId: number = Date.now();

			if (tripInput) {
				addTrip({
					tripId: tripId,
					tripName: tripInput,
				});
			} else {
				tripId = trips.find(
					(trip) => trip.tripName.trim() === tripDropdown.trim()
				)?.tripId!;
			}

			addPlace({
				placeId,
				placeName,
				placeAddress: placeAddress,
				tripId,
				placeCoords: placeCoords as Coords,
				placeDesc: description,
				placeImages: urls,
				createdAt: Date.now(),
				likes: [],
				userId: userId,
			});

			setMarkerToAdd(null);
		});
	};

	const placeAddressOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setPlaceAddress(val);
	};

	return markerToAdd ? (
		<WithModel backDropOnClick={loading ? () => {} : undefined}>
			<Wrapper onSubmit={onFormSubmit}>
				{loading ? (
					<Spinner width={'10rem'} height={'10rem'} />
				) : (
					<>
						<TripNameWrapper>
							<DropDownWrapper
								disabled={!!tripInput || tripOptions.length === 0}
							>
								<DropDown
									disabled={!!tripInput || tripOptions.length === 0}
									list={tripOptions}
									value={tripDropdown}
									onChangeHandler={setTripDropdown}
								/>
							</DropDownWrapper>
							<Or>or</Or>
							<TripInput
								disabled={tripDropdown !== defaultOption}
								placeholder='add new trip'
								value={tripInput}
								onChange={onTripInputChange}
							/>
						</TripNameWrapper>
						<PlaceName
							value={placeName}
							onChange={onPlaceNameChange}
							placeholder='add place name'
						/>
						<PlaceAddress
							placeholder='place address'
							value={placeAddress}
							onChange={placeAddressOnChange}
						/>
						<TripDescription
							placeholder='Place Description'
							onChange={onDescriptionChange}
							value={description}
						/>
						<ImageUploadsWrapper>
							{imageUploads.map(({ id, file, url, errorMessage, loading }) => {
								return (
									<ImageUpload
										key={id}
										inputId={id}
										loading={loading}
										url={url}
										errorMessage={errorMessage}
										onCancel={() => onImageUploadCancel(id)}
										onChange={(e) => onImageUploadChange(e, id)}
									/>
								);
							})}
						</ImageUploadsWrapper>
						<SaveButton disabled={!isFormValid}>Save</SaveButton>
					</>
				)}
			</Wrapper>
		</WithModel>
	) : (
		<Redirect to='/map' />
	);
};

const mapDispatchToProps = (
	dispatch: Dispatch<StoreActions>
): LinkDispatchToProps => ({
	loadingStart: () => dispatch(loadingStart()),
	addPlace: (place) => dispatch(addPlace(place)),
	addTrip: (trip) => dispatch(addTrip(trip)),
	setMarkerToAdd: (val) => dispatch(setMarkerToAdd(val)),
});

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	trips: selectTrips,
	sidebarTrips: selectSideBarTrips,
	userId: selectUserId,
	markerToAdd: selectMarkerToAdd,
	loading: selectLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPlace);
