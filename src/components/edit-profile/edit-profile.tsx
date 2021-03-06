import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useHistory, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AvatarEditor, { Editor } from '../avatar-editor/avatar-editor';
import WithModel from '../../hoc/With-model/With-model';
import {
	Wrapper,
	DisplayNameWrapper,
	DisplayName,
	UpdateButton,
} from './edit-profile.styles';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../redux/root.reducer';
import { UserState } from '../../redux/user/user.types';
import {
	selectUser,
	selectError,
	selectLoading,
	selectRedirectTo,
} from '../../redux/user/user.selectors';
import { Dispatch } from 'redux';
import {
	updateProfileStart,
	clearError,
	resetRedirectTo,
} from '../../redux/root.actions';
import { ErrorMessage } from '../../hoc/with-error/with-error';
import Spinner from '../spinner/spinner';

/**
 *
 *
 *
 *
 */

interface ProfileImageState {
	url: string;
	errorMessage: null | string;
}

interface LinkStateToProps
	extends Pick<UserState, 'user' | 'error' | 'loading' | 'redirectTo'> {}
interface LinkDispatchToProps {
	updateProfileStart: typeof updateProfileStart;
	clearError: typeof clearError;
	resetRedirectTo: typeof resetRedirectTo;
}
interface OwnProps {}
type Props = OwnProps & LinkStateToProps & LinkDispatchToProps;
const EditProfile: React.FC<Props> = ({
	user,
	updateProfileStart,
	error,
	loading,
	redirectTo,
	clearError,
	resetRedirectTo,
}) => {
	const [name, setName] = useState({
		displayName: user!.displayName,
		isValid: true,
	});

	const { goBack } = useHistory();
	const { colors } = useTheme();

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
			canvasElement.toBlob((blob) => {
				img = blob!;
				updateProfileStart(displayName, img, uid);
			}, 'image/jpeg');
		} else {
			updateProfileStart(displayName, img, uid);
		}
	};

	const { displayName, isValid } = name;
	const { url, errorMessage } = profileImg;

	useEffect(() => {
		if (redirectTo) {
			resetRedirectTo();
		}
	}, [redirectTo]);

	if (redirectTo) return <Redirect to={redirectTo} />;
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
			{loading ? (
				<Spinner
					width={'7rem'}
					margin={'5rem'}
					color={colors.mainDarker}
					height={'7rem'}
				/>
			) : (
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
			)}
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
	loading: selectLoading,
	redirectTo: selectRedirectTo,
});

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	updateProfileStart: (displayName, file, userId) =>
		dispatch(updateProfileStart(displayName, file, userId)),
	clearError: () => dispatch(clearError()),
	resetRedirectTo: () => dispatch(resetRedirectTo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
