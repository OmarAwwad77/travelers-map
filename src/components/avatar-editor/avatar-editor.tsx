import React, { ChangeEvent } from 'react';
import Editor from 'react-avatar-editor';
import {
	Wrapper,
	ImageUploadIcon,
	ErrorMessage,
	ImageUploadWrapper,
} from './avatar-editor.styles';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
export { Editor };

interface OwnProps {
	inputId: string;
	url: string;
	errorMessage: string | null;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onCancel: () => void;
}
type Props = OwnProps;
const AvatarEditor = React.forwardRef<Editor, Props>((props, ref) => {
	const { inputId, onChange, url, onCancel, errorMessage } = props;
	return (
		<>
			<Wrapper>
				<ImageUploadWrapper withUrl={!!url}>
					<input id={inputId} type='file' onChange={onChange} />
					{url ? (
						<Editor
							image={url}
							ref={ref}
							width={210}
							height={210}
							borderRadius={100}
							scale={1}
							color={[255, 255, 255, 0.6]}
						/>
					) : (
						<>
							<ImageUploadIcon htmlFor={inputId}>
								<Plus width='100%' height='100%' />
							</ImageUploadIcon>
						</>
					)}
				</ImageUploadWrapper>
				<ErrorMessage>{errorMessage}</ErrorMessage>
			</Wrapper>
			{url && (
				<>
					<button onClick={onCancel}>remove Image</button>
					<label htmlFor={inputId}>change Image</label>
				</>
			)}
		</>
	);
});

export default AvatarEditor;
