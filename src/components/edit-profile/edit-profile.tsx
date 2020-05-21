import React, { useState, useRef, ChangeEvent } from 'react';
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
import { selectUser } from '../../redux/user/user.selectors';

interface ProfileImageState {
	url: string;
	errorMessage: null | string;
}

interface LinkStateToProps extends Pick<UserState, 'user'> {}
interface OwnProps {}
type Props = OwnProps & LinkStateToProps;
const EditProfile: React.FC<Props> = ({ user }) => {
	const [state, setState] = useState({
		displayName: '',
		isValid: false,
	});

	const [profileImg, setProfileImg] = useState<ProfileImageState>({
		url: user!.url,
		errorMessage: null,
	});

	const editorRef = useRef<Editor>(null);

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setState((prevState) => ({
			...prevState,
			displayName: val,
			isValid: val !== '',
		}));
	};

	const onProfileImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
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
		const { displayName, url } = user!;
		if (editorRef.current) {
			editorRef.current.getImage().toBlob(async (blob) => {
				const url = await uploadImage(blob!);
				console.log(url);
			});
		}
	};

	const { displayName, isValid } = state;
	const { url, errorMessage } = profileImg;

	return (
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
});

export default connect(mapStateToProps)(EditProfile);
