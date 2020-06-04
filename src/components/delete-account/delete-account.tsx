import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { css, useTheme } from 'styled-components';

import Form from '../../components/form/form';
import WithModel from '../../hoc/With-model/With-model';

import { deleteAccountStart, clearError } from '../../redux/root.actions';
import { FormStateType } from '../form/form.types';
import { AppState } from '../../redux/root.reducer';
import { createStructuredSelector } from 'reselect';
import { UserState } from '../../redux/user/user.types';
import {
	selectError,
	selectUserProviderId,
	selectLoading,
} from '../../redux/user/user.selectors';
import {
	Wrapper,
	UpdateButton,
	ErrorMessage,
	ButtonsWrapper,
	Cancel,
	Confirm,
	ConfirmationMessage,
	Proceed,
} from '../change-password/change-password.styles';
import Spinner from '../spinner/spinner';

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
interface LinkStateToProps extends Pick<UserState, 'error' | 'loading'> {
	userProviderId: string;
}
interface OwnProps {}
type Props = LinkDispatchToProps & OwnProps & LinkStateToProps;

const DeleteAccount: React.FC<Props> = ({
	deleteAccountStart,
	clearError,
	error,
	loading,
	userProviderId,
}) => {
	const [state, setState] = useState(changeEmailForm);
	const [confirmed, setConfirmed] = useState(false);
	const { goBack } = useHistory();
	const { colors } = useTheme();

	useEffect(() => {
		userProviderId !== 'password' && confirmed && deleteAccountStart();
	}, [confirmed]);

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
			{loading ? (
				<Spinner
					width={'7rem'}
					margin={'5rem'}
					color={colors.mainDarker}
					height={'7rem'}
				/>
			) : (
				<Wrapper>
					{confirmed ? (
						userProviderId === 'password' && (
							<>
								<Form
									gridCss={gridCss}
									state={state}
									setState={setState}
									fieldNetworkError={
										error?.type === 'deleteAccount' ? error : null
									}
								/>
								<UpdateButton onClick={onSubmit} disabled={!state.isFormValid}>
									update
								</UpdateButton>
							</>
						)
					) : (
						<Confirm>
							<ConfirmationMessage>
								are you sure you want to proceed with this deleting you account
							</ConfirmationMessage>
							<ButtonsWrapper>
								<Cancel onClick={goBack}>Cancel</Cancel>
								<Proceed onClick={() => setConfirmed(true)}>Proceed</Proceed>
							</ButtonsWrapper>
						</Confirm>
					)}
				</Wrapper>
			)}
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
	loading: selectLoading,
	userProviderId: selectUserProviderId,
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
