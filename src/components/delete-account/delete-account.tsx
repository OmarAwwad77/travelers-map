import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { css } from 'styled-components';

import Form from '../../components/form/form';
import WithModel from '../../hoc/With-model/With-model';

import { deleteAccountStart, clearError } from '../../redux/root.actions';
import { FormStateType } from '../form/form.types';
import { AppState } from '../../redux/root.reducer';
import { createStructuredSelector } from 'reselect';
import { UserState } from '../../redux/user/user.types';
import { selectError } from '../../redux/user/user.selectors';
import {
	ChangePasswordWrapper as DeleteAccountWrapper,
	UpdateButton,
	ErrorMessage,
} from '../change-password/change-password.styles';

export const gridCss = css`
	gap: 1rem;
	grid-template-areas:
		'title title'
		'passwordLabel passwordLabel'
		'password password';
`;

const changeEmailForm: FormStateType = {
	titles: {
		title: 'delete account',
	},
	fields: [
		{
			type: 'password',
			label: 'password',
			value: '',
			isValid: false,
			validation: {
				required: true,
				minLen: 6,
				maxLen: 12,
			},
		},
	],
	isFormValid: false,
};

interface LinkDispatchToProps {
	deleteAccountStart: typeof deleteAccountStart;
	clearError: typeof clearError;
}
interface LinkStateToProps extends Pick<UserState, 'error'> {}
interface OwnProps {}
type Props = LinkDispatchToProps & OwnProps & LinkStateToProps;

const DeleteAccount: React.FC<Props> = ({
	deleteAccountStart,
	clearError,
	error,
}) => {
	const [state, setState] = useState(changeEmailForm);
	const { goBack } = useHistory();

	const onSubmit = () => {
		if (!state.isFormValid) return;

		const password = state.fields.find((field) => field.label === 'password')!
			.value as string;

		deleteAccountStart(password);
	};

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
			<DeleteAccountWrapper>
				<Form
					gridCss={gridCss}
					state={state}
					setState={setState}
					fieldNetworkError={error?.type === 'deleteAccount' ? error : null}
				/>
				<UpdateButton onClick={onSubmit} disabled={!state.isFormValid}>
					update
				</UpdateButton>
			</DeleteAccountWrapper>
		</WithModel>
	);
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	deleteAccountStart: (password) => dispatch(deleteAccountStart(password)),
	clearError: () => dispatch(clearError()),
});

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	error: selectError,
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
