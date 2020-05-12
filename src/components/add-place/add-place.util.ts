import { ImageUpload, Ids } from './add-place';

export const setImageUploadError = (
	state: ImageUpload[],
	id: Ids,
	errorMessage: string
) =>
	state.map((imageUpload) => {
		if (imageUpload.id === id) {
			return {
				...imageUpload,
				errorMessage,
				loading: false,
				file: null,
				url: '',
			};
		}
		return imageUpload;
	});

export const updateImageUploads = (
	state: ImageUpload[],
	id: Ids,
	upatedFields: Partial<ImageUpload>
) =>
	state.map((imageUpload) => {
		if (imageUpload.id === id) {
			return {
				...imageUpload,
				...upatedFields,
			};
		}
		return imageUpload;
	});

export const getFileDataUrl = (file: File) => {
	return new Promise<string>((resolve) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.readAsDataURL(file);
	});
};
