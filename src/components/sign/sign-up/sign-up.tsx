import React, { useState } from 'react';
import { connect } from 'react-redux';
import { css, useTheme } from 'styled-components';

import Form from '../../form/form';
import { FormStateType } from '../../form/form.types';
import { SignButton } from '../sign.styles';
import Spinner from '../../spinner/spinner';
import { Dispatch } from 'redux';
import { UserState } from '../../../redux/user/user.types';
import { signUpStart, clearError } from '../../../redux/root.actions';
import { AppState } from '../../../redux/root.reducer';
import { selectError, selectLoading } from '../../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import withError from '../../../hoc/with-error/with-error';

const signUpGridCss = css`
	width: 100%;
	gap: 1rem;
	grid-template-areas:
		'title title'
		'subTitle subTitle'
		'divider divider'
		'displayNameLabel displayNameLabel'
		'displayName displayName'
		'emailLabel emailLabel'
		'email email'
		'passwordLabel passwordLabel'
		'password password'
		'confirmPasswordLabel confirmPasswordLabel'
		'confirmPassword confirmPassword';
`;

const signUpFormInitialState: FormStateType = {
	titles: {
		title: 'I do not have a account',
		subTitle: 'Sign up with your email and password',
	},
	fields: [
		{
			type: 'text',
			label: 'displayName',
			displayLabel: 'display name',
			isValid: false,
			value: '',
			validation: {
				required: true,
			},
		},
		{
			type: 'text',
			label: 'email',
			value: '',
			isValid: false,
			validation: {
				required: true,
				type: 'email',
			},
		},
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
			type: 'password',
			label: 'confirmPassword',
			displayLabel: 'confirm password',
			value: '',
			isValid: false,
			validation: {
				required: true,
				shouldMatch: 'password',
			},
		},
	],
	isFormValid: false,
};

interface LinkDispatchToProps {
	signUpStart: typeof signUpStart;
	clearError: typeof clearError;
}
interface LinkStateToProps extends Pick<UserState, 'error' | 'loading'> {}
interface OwnProps {}
type Props = LinkDispatchToProps & LinkStateToProps & OwnProps;

const SignUp: React.FC<Props> = ({ signUpStart, error, loading }) => {
	const [signUpState, setSignUpState] = useState<FormStateType>(
		signUpFormInitialState
	);
	const { colors } = useTheme();
	const onSignUp = () => {
		if (loading || !signUpState.isFormValid) return;
		const credentials = {
			displayName: signUpState.fields.find(
				(field) => field.label === 'displayName'
			)!.value as string,
			email: signUpState.fields.find((field) => field.label === 'email')!
				.value as string,
			password: signUpState.fields.find((field) => field.label === 'password')!
				.value as string,
		};

		signUpStart(credentials);
	};
	return (
		<>
			<Form
				setState={setSignUpState}
				state={signUpState}
				gridCss={signUpGridCss}
				fieldNetworkError={
					error?.label !== 'unknown' && error?.type === 'sign-up' ? error : null
				}
			/>
			{loading ? (
				<Spinner width='4rem' height='4rem' color={colors.mainDarker} />
			) : (
				<SignButton onClick={onSignUp}>sign Up</SignButton>
			)}
		</>
	);
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	signUpStart: (credentials) => dispatch(signUpStart(credentials)),
	clearError: () => dispatch(clearError()),
});

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	error: selectError,
	loading: selectLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(withError(SignUp));
