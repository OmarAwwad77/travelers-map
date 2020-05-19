import { SetStateAction, Dispatch } from 'react';
import {
	FlattenInterpolation,
	ThemeProps,
	DefaultTheme,
} from 'styled-components';

export type GridCss = FlattenInterpolation<ThemeProps<DefaultTheme>>;

export type InputTypes = 'text' | 'select' | 'password';

export type ValidationType = {
	required?: boolean;
	maxLen?: number;
	minLen?: number;
	shouldMatch?: string;
	type?: 'email' | 'phoneNo' | 'text' | 'number';
};

export interface FieldNetworkError {
	label: string;
	message: string;
}

export type FieldType = {
	type: InputTypes;
	label: string;
	displayLabel?: string;
	value: string | { value: string; label: string };
	options?: { value: string; label: string }[];
	isValid: boolean;
	errorMessage?: null | string;
	validation?: ValidationType;
};

export interface FormStateType {
	titles: { title: string; subTitle?: string };
	fields: FieldType[];
	isFormValid: boolean;
}

export interface FormPropsType {
	gridCss: GridCss;
	state: FormStateType;
	setState: Dispatch<SetStateAction<FormStateType>>;
	fieldNetworkError?: FieldNetworkError | null;
}
