import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { css, useTheme } from 'styled-components';

import Form from '../../components/form/form';
import WithModel from '../../hoc/With-model/With-model';

import {
	changeEmailStart,
	clearError,
	resetRedirectTo,
} from '../../redux/root.actions';
import { FormStateType } from '../form/form.types';
import { AppState } from '../../redux/root.reducer';
import { createStructuredSelector } from 'reselect';
import { UserState } from '../../redux/user/user.types';
import {
	selectError,
	selectLoading,
	selectRedirectTo,
} from '../../redux/user/user.selectors';
import {
	Wrapper,
	UpdateButton,
	ErrorMessage,
} from '../change-password/change-password.styles';
import Spinner from '../spinner/spinner';

export const gridCss = css`
	gap: 1rem;
	grid-template-areas:
		'title title'
		'passwordLabel passwordLabel'
		'password password'
		'emailLabel emailLabel'
		'email email';
`;

const changeEmailForm: FormStateType = {
	titles: {
		title: 'Change email',
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
		{
			type: 'text',
			label: 'email',
			displayLabel: 'New Email',
			value: '',
			isValid: false,
			validation: {
				required: true,
				type: 'email',
			},
		},
	],
	isFormValid: false,
};

interface LinkDispatchToProps {
	changeEmailStart: typeof changeEmailStart;
	clearError: typeof clearError;
	resetRedirectTo: typeof resetRedirectTo;
}
interface LinkStateToProps
	extends Pick<UserState, 'error' | 'loading' | 'redirectTo'> {}
interface OwnProps {}
type Props = LinkDispatchToProps & OwnProps & LinkStateToProps;

const ChangeEmail: React.FC<Props> = ({
	changeEmailStart,
	clearError,
	resetRedirectTo,
	redirectTo,
	loading,
	error,
}) => {
	const [state, setState] = useState(changeEmailForm);
	const { goBack, push } = useHistory();
	const { colors } = useTheme();

	const onSubmit = () => {
		if (!state.isFormValid) return;

		const email = state.fields.find((field) => field.label === 'email')!
			.value as string;
		const password = state.fields.find((field) => field.label === 'password')!
			.value as string;

		changeEmailStart(email, password);
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
						fieldNetworkError={error?.type === 'changeEmail' ? error : null}
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
	changeEmailStart: (email, password) =>
		dispatch(changeEmailStart(email, password)),
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);
