import React, { ChangeEvent, useEffect } from 'react';

import {
	FormWrapper,
	Label,
	Required,
	Title,
	SubTitle,
	subTitleGridArea,
	titleGridArea,
	Divider,
	dividerGridArea,
	Select,
} from './form.styles';
import FormInput from './form-input/form-input';

import {
	FieldType,
	FormPropsType,
	FormStateType,
	ValidationType,
	InputTypes,
} from './form.types';

const From: React.FC<FormPropsType> = ({
	gridCss,
	state,
	setState,
	fieldNetworkError,
}) => {
	useEffect(() => {
		if (fieldNetworkError) {
			const { label, message } = fieldNetworkError;
			const { fields } = state;
			const updatedFields = fields.map((field) => {
				if (field.label === label) {
					return {
						...field,
						errorMessage: message,
					};
				} else {
					return field;
				}
			});
			setState({
				...state,
				fields: updatedFields,
			});
		}
	}, [fieldNetworkError]);

	const selectHandler = (selectedOption: { value: string; label: string }) => {
		const fieldToUpdate = state.fields.find((f) => f.type === 'select');

		const newState: FormStateType = {
			...state,
			fields: [
				...state.fields.filter((field) => field.type !== 'select'),
				{
					...fieldToUpdate!,
					value: selectedOption,
				},
			],
		};

		setState(newState);
	};

	const inputOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const fieldId = e.target.id;
		const fieldValue = e.target.value;
		const fieldToUpdate = state.fields.find((field) => field.label === fieldId);

		const errorMessage = checkFieldValidity(
			fieldValue,
			fieldToUpdate!.validation,
			state.fields
		);
		const isValid = errorMessage ? false : true;

		let connectedFieldUpdated = null;
		const connectedFieldExists: FieldType | undefined = state.fields.find(
			(field) => field.label.toLowerCase() === `confirm${fieldId}`.toLowerCase()
		);

		const fieldsUpdated: FieldType[] = [
			...state.fields.filter(
				(field) =>
					field.label !== fieldId &&
					field.label.toLowerCase() !== `confirm${fieldId}`.toLowerCase()
			),
			{
				...fieldToUpdate!,
				value: fieldValue,
				isValid,
				errorMessage,
			},
		];

		if (connectedFieldExists) {
			connectedFieldUpdated = {
				...connectedFieldExists!,
				errorMessage: (connectedFieldExists.value as string)
					? checkFieldValidity(
							connectedFieldExists.value as string,
							connectedFieldExists.validation!,
							fieldsUpdated
					  )
					: null,
			};
		}

		connectedFieldExists && fieldsUpdated.push(connectedFieldUpdated!);

		const isFormValidUpdated = checkFormValidity(fieldsUpdated);

		const newState: FormStateType = {
			titles: state.titles,
			fields: fieldsUpdated,
			isFormValid: isFormValidUpdated,
		};

		setState(newState);
	};

	const getFormFieldByType = (type: InputTypes, field: FieldType) => {
		if (type === 'text' || type === 'password') {
			return (
				<FormInput
					gridArea={field.label}
					id={field.label}
					onChange={inputOnchangeHandler}
					value={field.value as string}
					errorMessage={field.errorMessage!}
					type={type}
				/>
			);
		} else if (type === 'select') {
			return (
				<Select
					gridArea={field.label}
					className='react-select-container'
					classNamePrefix='react-select'
					options={field.options}
					value={field.value}
					onChange={selectHandler}
				/>
			);
		}
	};

	return (
		<FormWrapper css={gridCss} onSubmit={(e) => e.preventDefault()}>
			<Title gridArea={titleGridArea}>{state.titles.title}</Title>
			{state.titles.subTitle && (
				<SubTitle as='h4' gridArea={subTitleGridArea}>
					{state.titles.subTitle}
				</SubTitle>
			)}
			<Divider gridArea={dividerGridArea} />
			{state.fields.map((field) => {
				return (
					<React.Fragment key={field.label}>
						<Label htmlFor={field.label} gridArea={`${field.label}Label`}>
							{field.displayLabel ?? field.label}
							{field.validation?.required && <Required>*</Required>}
						</Label>
						{getFormFieldByType(field.type, field)}
					</React.Fragment>
				);
			})}
		</FormWrapper>
	);
};

export default React.memo(From);

const checkFormValidity = (fieldsUpdated: FieldType[]) => {
	let isFormValid = true;
	fieldsUpdated.map((field) => {
		isFormValid = isFormValid && (field.isValid ?? true);
	});
	return isFormValid;
};

const checkFieldValidity = (
	val: string,
	validationObj: ValidationType | undefined,
	fields: FieldType[]
): null | string => {
	if (!validationObj) return null;
	if (validationObj.shouldMatch) {
		const fieldToMatch = fields.find(
			(field) => field.label === validationObj.shouldMatch
		);
		const valueToMatch = fieldToMatch?.value;
		if (valueToMatch) {
			if (valueToMatch !== val) return `Doesn't match ${fieldToMatch?.label}`;
		}
	}
	if (validationObj.required) {
		const isValid = val.trim() !== '';
		if (!isValid) return 'Required Field';
	} //

	if (validationObj.type === 'text') {
		const pattern = /^[a-z]*$/i;
		const isValid = pattern.test(val);
		if (!isValid && val) return 'Only Text Allowed';
	}

	if (validationObj.type === 'email') {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		const isValid = pattern.test(val);
		if (!isValid && val) return 'Invalid Email';
	}
	if (validationObj.type === 'phoneNo') {
		const pattern = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
		const isValid = pattern.test(val);
		if (!isValid && val) return 'Invalid Phone Number';
	}

	if (validationObj.type === 'number') {
		const pattern = /^-?\d+\.?\d*$/;
		const isValid = pattern.test(val);
		if (!isValid && val) return 'Only Numbers Allowed';
	}

	if (validationObj.maxLen) {
		const isValid = val.length <= validationObj.maxLen;
		if (!isValid) return `Maximum ${validationObj.maxLen} Characters`;
	}
	if (validationObj.minLen) {
		const isValid = val.length >= validationObj.minLen;
		if (!isValid) return `Minimum ${validationObj.minLen} Characters`;
	}

	return null;
};
