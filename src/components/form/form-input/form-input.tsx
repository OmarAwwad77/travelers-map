import React, { ChangeEvent } from 'react';

import { InputWrapper, Input, InputError } from '../form.styles';

const FormInput: React.FC<{
	gridArea: string;
	id: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	errorMessage: string | null;
	type: string;
}> = (props) => {
	const { errorMessage, gridArea, ...theRest } = props;
	return (
		<InputWrapper gridArea={gridArea}>
			<Input {...theRest} autoComplete='on' />
			<InputError> {errorMessage} </InputError>
		</InputWrapper>
	);
};

export default FormInput;
