import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { Redirect } from 'react-router-dom';

import SignIn from '../../components/sign/sign-in/sign-in';
import SignUp from '../../components/sign/sign-up/sign-up';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../redux/root.reducer';
import media from '../../styles/media-queries';
import { selectIsAuth } from '../../redux/user/user.selectors';

interface LinkStateToProps {
	isAuth: boolean;
}
interface OwnProps {}
type Props = LinkStateToProps & OwnProps;
const Sign: React.FC<Props> = ({ isAuth }) => {
	return (
		<Wrapper>
			{isAuth && <Redirect to='/' />}
			<SignInWrapper>
				<SignIn />
			</SignInWrapper>
			<SignUpWrapper>
				<SignUp />
			</SignUpWrapper>
		</Wrapper>
	);
};

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	isAuth: selectIsAuth,
});

export default connect(mapStateToProps)(Sign);

export const Wrapper = styled.section`
	max-width: 110rem;
	margin: 0 auto;
	padding: 4rem;
	display: flex;
	justify-content: space-between;

	${media.BREAK_POINT_950_PX(css`
		flex-direction: column;
		align-items: center;
		padding: 0.5rem;
		margin: 5rem 0;
		& > * {
			&:not(:first-child) {
				margin-top: 5rem;
			}
		}
	`)}

	${media.BREAK_POINT_500_PX(css`
		& > * {
			max-width: 31rem;
		}
	`)}
`;

export const SignInWrapper = styled.div`
	width: 40rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
export const SignUpWrapper = styled.div`
	width: 40rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
