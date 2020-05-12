import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useHistory, useParams } from 'react-router-dom';

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
} from './add-place.styles';
import WithModel from '../../hoc/with-model/with-model';
import DropDown from '../drop-down/drop-down';
import ImageUpload from '../image-upload/image-upload';
import {
	setImageUploadError,
	updateImageUploads,
	getFileDataUrl,
} from './add-place.util';
import { storageRef, uploadImage } from '../../firebase/firebase.utils';
import { StoreActions, addPlace, addTrip } from '../../redux/root.actions';
import { Place, Trip } from '../../redux/map/map.types';

export type Ids = 'main' | 'extra1';
export type ImageUpload = {
	id: Ids;
	file: File | null;
	url: string;
	loading: boolean;
	errorMessage: string | null;
};
const options = ['paris', 'amsterdam', 'london'];
const defaultOption = 'choose a trip';

interface OwnProps {}

interface LinkDispatchProps {
	addPlace: typeof addPlace;
	addTrip: typeof addTrip;
}

type Props = OwnProps & LinkDispatchProps;
const AddPlace: React.FC<Props> = ({ addPlace, addTrip }) => {
	const [tripDropdown, setTripDropdown] = useState(defaultOption);
	const [tripInput, setTripInput] = useState('');
	const [placeName, setPlaceName] = useState('');
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
		const descriptionEmpty = description === '';
		const mainImageEmpty =
			imageUploads.find((image) => image.id === 'main')?.file === null;

		if (tripNameEmpty || descriptionEmpty || mainImageEmpty || placeNameEmpty) {
			setIsFormValid(false);
		} else {
			setIsFormValid(true);
		}
	}, [imageUploads, description, tripInput, tripDropdown, placeName]);

	const { goBack } = useHistory();
	const { id, coords } = useParams<{
		id: string;
		coords: string;
	}>();

	const placeId = +id;
	const placeCoords = coords.split(',').map((val) => +val);

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
		const maxFileSize = 1;

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

		let promises: Promise<string>[] = [];
		files.forEach(async (file) => {
			promises.push(uploadImage(file));
		});
		Promise.all([...promises]).then((urls) => {
			const tripId = Date.now();

			addTrip({
				id: tripId,
				tripName: tripInput,
			});

			addPlace({
				placeId,
				placeCoords,
				placeName,
				tripId,
				placeDesc: description,
				placeImages: urls,
			});
		});
	};

	return (
		<WithModel backDropOnClick={goBack}>
			<Wrapper onSubmit={onFormSubmit}>
				<TripNameWrapper>
					<DropDownWrapper disabled={!!tripInput}>
						<DropDown
							disabled={!!tripInput}
							list={options}
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
			</Wrapper>
		</WithModel>
	);
};

const mapDispatchToProps = (
	dispatch: Dispatch<StoreActions>
): LinkDispatchProps => ({
	addPlace: (place: Place) => dispatch(addPlace(place)),
	addTrip: (trip: Trip) => dispatch(addTrip(trip)),
});

export default connect(null, mapDispatchToProps)(AddPlace);
