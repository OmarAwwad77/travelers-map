import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Form from '../../components/form/form';
import WithModel from '../../hoc/With-model/With-model';

import { changePasswordStart } from '../../redux/root.actions';
import { FormStateType } from '../form/form.types';
import { AppState } from '../../redux/root.reducer';
import { createStructuredSelector } from 'reselect';
import { UserState } from '../../redux/user/user.types';
import { selectError } from '../../redux/user/user.selectors';
import {
	ChangePasswordWrapper,
	UpdateButton,
	gridCss,
} from './change-password.styles';

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
}
interface LinkStateToProps extends Pick<UserState, 'error'> {}
interface OwnProps {}
type Props = LinkDispatchToProps & OwnProps & LinkStateToProps;

const ChangePassword: React.FC<Props> = ({ changePasswordStart, error }) => {
	const [state, setState] = useState(changePasswordForm);
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

	return (
		<WithModel>
			<ChangePasswordWrapper>
				<Form
					gridCss={gridCss}
					state={state}
					setState={setState}
					fieldNetworkError={
						error?.label !== 'unknown' && error?.type === 'changePassword'
							? error
							: null
					}
				/>
				<UpdateButton onClick={onSubmit} disabled={!state.isFormValid}>
					update
				</UpdateButton>
			</ChangePasswordWrapper>
		</WithModel>
	);
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	changePasswordStart: (oldPass, newPass) =>
		dispatch(changePasswordStart(oldPass, newPass)),
});

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	error: selectError,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
