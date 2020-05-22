import React, { useState, useRef, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import AvatarEditor, { Editor } from '../avatar-editor/avatar-editor';
import WithModel from '../../hoc/With-model/With-model';
import {
	Wrapper,
	DisplayNameWrapper,
	DisplayName,
	UpdateButton,
} from './edit-profile.styles';
import { uploadImage } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../redux/root.reducer';
import { UserState } from '../../redux/user/user.types';
import { selectUser, selectError } from '../../redux/user/user.selectors';
import { Dispatch } from 'redux';
import { updateProfileStart, clearError } from '../../redux/root.actions';
import { ErrorMessage } from '../../hoc/with-error/with-error';

interface ProfileImageState {
	url: string;
	errorMessage: null | string;
}

interface LinkStateToProps extends Pick<UserState, 'user' | 'error'> {}
interface LinkDispatchToProps {
	updateProfileStart: typeof updateProfileStart;
	clearError: typeof clearError;
}
interface OwnProps {}
type Props = OwnProps & LinkStateToProps & LinkDispatchToProps;
const EditProfile: React.FC<Props> = ({
	user,
	updateProfileStart,
	error,
	clearError,
}) => {
	const [name, setName] = useState({
		displayName: user!.displayName,
		isValid: true,
	});

	const { goBack } = useHistory();

	const [profileImg, setProfileImg] = useState<ProfileImageState>({
		url: user!.url,
		errorMessage: null,
	});

	const editorRef = useRef<Editor>(null);

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setName((prevState) => ({
			displayName: val,
			isValid: val !== '',
		}));
	};

	const onProfileImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const file = e.target.files?.[0];
		console.log(file);
		if (!file) return;

		// validate file

		const validExts = ['jpg', 'png', 'jpeg'];
		const maxFileSize = 5;

		const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1);
		const fileSize = file.size / 1000000; // mb

		if (!validExts.includes(fileExt)) {
			setProfileImg((prevState) => ({
				...prevState,
				errorMessage: `invalid file extension. supported extensions (${validExts.join(
					' '
				)})`,
			}));
			return;
		}

		if (fileSize > maxFileSize) {
			setProfileImg((prevState) => ({
				...prevState,
				errorMessage: `Image is too big (max ${maxFileSize}mb)`,
			}));
			return;
		}

		const dataUrl = await getFileDataUrl(file);

		setProfileImg({
			url: dataUrl,
			errorMessage: null,
		});
	};

	const getFileDataUrl = (file: File) => {
		return new Promise<string>((res) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => res(reader.result as string);
		});
	};

	const onProfileImageCancel = () => {
		setProfileImg({
			errorMessage: null,
			url: '',
		});
	};

	const onSubmit = () => {
		if (!isValid) return;
		const { displayName } = name;
		const { uid } = user!;
		let img: Blob | string =
			'https://firebasestorage.googleapis.com/v0/b/connect-c44e6.appspot.com/o/images%2Fuser.svg?alt=media&token=ef7689a1-9619-4265-bd81-674e50437dd5';
		if (editorRef.current) {
			// both name and url
			const canvasElement = editorRef.current.getImage();
			console.log(canvasElement);
			canvasElement.toBlob((blob) => {
				img = blob!;
				console.log(img);
				updateProfileStart(displayName, img, uid);
			});
		} else {
			updateProfileStart(displayName, img, uid);
		}
	};

	const { displayName, isValid } = name;
	const { url, errorMessage } = profileImg;

	return error?.label === 'unknown' ? (
		<WithModel
			backDropOnClick={() => {
				clearError();
				goBack();
			}}
		>
			<ErrorMessage>{error.message}</ErrorMessage>
		</WithModel>
	) : (
		<WithModel>
			<Wrapper>
				<AvatarEditor
					ref={editorRef}
					url={url}
					inputId={'profileImg'}
					errorMessage={errorMessage}
					onChange={onProfileImageChange}
					onCancel={onProfileImageCancel}
				/>
				<DisplayNameWrapper>
					<label htmlFor='displayName'>Display Name: </label>
					<DisplayName
						value={displayName}
						onChange={onInputChange}
						id='displayName'
					/>
				</DisplayNameWrapper>
				<UpdateButton disabled={!isValid} onClick={onSubmit}>
					Update
				</UpdateButton>
			</Wrapper>
		</WithModel>
	);
};

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	user: selectUser,
	error: selectError,
});

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	updateProfileStart: (displayName, file, userId) =>
		dispatch(updateProfileStart(displayName, file, userId)),
	clearError: () => dispatch(clearError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
