import React from 'react';
import styled from 'styled-components';

import WithModel from '../With-model/With-model';
import { UserState } from '../../redux/user/user.types';

const ErrorMessage = styled.div`
	text-transform: capitalize;
	font-size: 1.8rem;
	font-weight: 600;
	padding: 5rem;
`;

interface Props extends Pick<UserState, 'error'> {
	clearError: Function;
}

const withError = (Component: React.FC<any>) => {
	return (props: Props) => {
		const { error, clearError } = props;
		return error?.label === 'unknown' ? (
			<>
				<Component {...props} />
				<WithModel backDropOnClick={() => clearError()}>
					<ErrorMessage>{error.message}</ErrorMessage>
				</WithModel>
			</>
		) : (
			<Component {...props} />
		);
	};
};

export default withError;
