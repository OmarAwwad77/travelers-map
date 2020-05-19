import React, { useState } from 'react';
import { connect } from 'react-redux';
import { css, useTheme } from 'styled-components';

import Form from '../../form/form';
import { FormStateType } from '../../form/form.types';
import Spinner from '../../spinner/spinner';
import { ReactComponent as GoogleIcon } from '../../../assets/icons/google.svg';
import { SignButton } from '../sign.styles';
import { Dispatch } from 'redux';
import {
	emailSignInStart,
	googleSignInStart,
	clearError,
} from '../../../redux/root.actions';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../../redux/root.reducer';
import { UserState } from '../../../redux/user/user.types';
import { selectError, selectLoading } from '../../../redux/user/user.selectors';
import withError from '../../../hoc/with-error/with-error';

const signInFormInitialState: FormStateType = {
	titles: {
		title: 'I already have an account',
		subTitle: 'Sign in with your email and password',
	},
	fields: [
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
	],
	isFormValid: false,
};

const signInGridCss = css`
	width: 100%;
	gap: 1rem;
	grid-template-areas:
		'title title'
		'subTitle subTitle'
		'divider divider'
		'emailLabel emailLabel'
		'email email'
		'passwordLabel passwordLabel'
		'password password';
`;

interface LinkDispatchToProps {
	emailSignInStart: typeof emailSignInStart;
	googleSignInStart: typeof googleSignInStart;
	clearError: typeof clearError;
}
interface LinkStateToProps extends Pick<UserState, 'error' | 'loading'> {}
interface OwnProps {}
type Props = LinkDispatchToProps & OwnProps & LinkStateToProps;

const SignIn: React.FC<Props> = ({
	emailSignInStart,
	googleSignInStart,
	error,
	loading,
}) => {
	const [signInState, setSignInState] = useState<FormStateType>(
		signInFormInitialState
	);
	const { colors } = useTheme();

	const onEmailSignIn = () => {
		if (!signInState.isFormValid) return;
		const credentials = {
			email: signInState.fields.find((field) => field.label === 'email')!
				.value as string,
			password: signInState.fields.find((field) => field.label === 'password')!
				.value as string,
		};
		emailSignInStart(credentials);
	};
	return (
		<>
			<Form
				state={signInState}
				gridCss={signInGridCss}
				setState={setSignInState}
				fieldNetworkError={
					error?.label !== 'unknown' && error?.type === 'sign-in' ? error : null
				}
			/>
			{loading ? (
				<Spinner width='4rem' height='4rem' color={colors.mainDarker} />
			) : (
				<>
					<SignButton onClick={onEmailSignIn}>sign in</SignButton>
					<SignButton onClick={googleSignInStart} google>
						Sign in with &nbsp; <GoogleIcon />
					</SignButton>
				</>
			)}
		</>
	);
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	emailSignInStart: (credentials) => dispatch(emailSignInStart(credentials)),
	googleSignInStart: () => dispatch(googleSignInStart()),
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

export default connect(mapStateToProps, mapDispatchToProps)(withError(SignIn));
