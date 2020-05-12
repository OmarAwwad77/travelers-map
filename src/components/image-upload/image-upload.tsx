import React, { ChangeEvent } from 'react';

import {
	Wrapper,
	ImagePreview,
	ImagePreviewOverlay,
	ImageUploadIcon,
	ErrorMessage,
	ImageUploadWrapper,
	Spinner,
} from './image-upload.styles';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';

interface OwnProps {
	inputId: string;
	url: string;
	loading: boolean;
	errorMessage: string | null;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onCancel: () => void;
	onSwitch?: () => void;
}
type Props = OwnProps;
const ImageUpload: React.FC<Props> = ({
	inputId,
	loading,
	onChange,
	url,
	onCancel,
	onSwitch,
	errorMessage,
}) => {
	let text = 'Additional Image';
	let requiredText = '(Optional)';
	if (inputId === 'main') {
		text = 'Main Image';
		requiredText = '(Required)';
	}
	return (
		<Wrapper>
			<ImageUploadWrapper withUrl={!!url}>
				{loading ? (
					<Spinner />
				) : (
					<>
						<input id={inputId} type='file' onChange={onChange} />
						{url ? (
							<ImagePreview url={url}>
								<ImagePreviewOverlay>
									<a onClick={onCancel}>Cancel</a>

									<label onClick={onSwitch} htmlFor={inputId}>
										Change
									</label>
								</ImagePreviewOverlay>
							</ImagePreview>
						) : (
							<>
								<ImageUploadIcon htmlFor={inputId}>
									<Plus width='100%' height='100%' />
								</ImageUploadIcon>
								<span>{text}</span>
								<span style={{ whiteSpace: 'pre-line' }}>{requiredText}</span>
							</>
						)}
					</>
				)}
			</ImageUploadWrapper>
			<ErrorMessage>{errorMessage}</ErrorMessage>
		</Wrapper>
	);
};

export default ImageUpload;
