import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Form from '../../components/form/form';
import WithModel from '../../hoc/With-model/With-model';

import {
	changePasswordStart,
	clearError,
	resetRedirectTo,
} from '../../redux/root.actions';
import { FormStateType } from '../form/form.types';
import { AppState } from '../../redux/root.reducer';
import { createStructuredSelector } from 'reselect';
import { UserState } from '../../redux/user/user.types';
import {
	selectError,
	selectRedirectTo,
	selectLoading,
} from '../../redux/user/user.selectors';
import {
	Wrapper,
	UpdateButton,
	gridCss,
	ErrorMessage,
} from './change-password.styles';
import { useTheme } from 'styled-components';
import Spinner from '../spinner/spinner';

const changePasswordForm: FormStateType = {
	titles: {
		title: 'Change password',
	},
	fields: [
		{
			type: 'password',
			label: 'oldPassword',
			displayLabel: 'Old Password',
			value: '',
			isValid: false,
			validation: {
				required: true,
				minLen: 6,
				maxLen: 12,
			},
		},
		{
			type: 'password',
			label: 'newPassword',
			displayLabel: 'New Password',
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
	changePasswordStart: typeof changePasswordStart;
	clearError: typeof clearError;
	resetRedirectTo: typeof resetRedirectTo;
}
interface LinkStateToProps
	extends Pick<UserState, 'error' | 'loading' | 'redirectTo'> {}
interface OwnProps {}
type Props = LinkDispatchToProps & OwnProps & LinkStateToProps;

const ChangePassword: React.FC<Props> = ({
	changePasswordStart,
	clearError,
	loading,
	redirectTo,
	resetRedirectTo,
	error,
}) => {
	const [state, setState] = useState(changePasswordForm);
	const { colors } = useTheme();
	const { goBack, push } = useHistory();

	const onSubmit = () => {
		if (!state.isFormValid) return;

		const oldPassword = state.fields.find(
			(field) => field.label === 'oldPassword'
		)!.value as string;
		const newPassword = state.fields.find(
			(field) => field.label === 'newPassword'
		)!.value as string;

		changePasswordStart(oldPassword, newPassword);
	};

	useEffect(() => {
		if (redirectTo) {
			resetRedirectTo();
			push(redirectTo);
		}
	}, [redirectTo]);

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
					<Form
						gridCss={gridCss}
						state={state}
						setState={setState}
						fieldNetworkError={error?.type === 'changePassword' ? error : null}
					/>
					<UpdateButton onClick={onSubmit} disabled={!state.isFormValid}>
						update
					</UpdateButton>
				</Wrapper>
			)}
		</WithModel>
	);
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	changePasswordStart: (oldPass, newPass) =>
		dispatch(changePasswordStart(oldPass, newPass)),
	clearError: () => dispatch(clearError()),
	resetRedirectTo: () => dispatch(resetRedirectTo()),
});

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	error: selectError,
	loading: selectLoading,
	redirectTo: selectRedirectTo,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
