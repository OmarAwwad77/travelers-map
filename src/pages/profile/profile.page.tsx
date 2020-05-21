import React from 'react';
import { connect } from 'react-redux';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Dispatch } from 'redux';

import { PostsArea } from '../../components/news-feed/news-feed.styles';
import SideBar from '../../components/sidebar/sidebar';
import Post from '../../components/post/post';
import User from '../../components/user/user';
import Tabs, { Tab } from '../../components/tabs/tabs';
import ChangeEmail from '../../components/change-email/change-email';
import ChangePassword from '../../components/change-password/change-password';
import DeleteAccount from '../../components/delete-account/delete-account';
import EditProfile from '../../components/edit-profile/edit-profile';
import { AppState } from '../../redux/root.reducer';
import { selectUserProviderId } from '../../redux/user/user.selectors';
import { deleteAccountStart } from '../../redux/root.actions';
import {
	EditLink,
	Wrapper,
	TabsWrapper,
	SideBarWrapper,
	EditLinksWrapper,
} from './profile.page.styles';

interface LinkStateToProps {
	userProviderId: string;
}
interface LinkDispatchToProps {
	deleteAccountStart: typeof deleteAccountStart;
}
interface OwnProps {}
type Props = LinkStateToProps & OwnProps & LinkDispatchToProps;

const Profile: React.FC<Props> = ({ userProviderId, deleteAccountStart }) => {
	const { path } = useRouteMatch();
	const { push } = useHistory();
	const nestedRoutes = (
		<>
			<Route
				path={`${path}/change-password`}
				exact
				component={ChangePassword}
			/>
			<Route path={`${path}/change-email`} exact component={ChangeEmail} />
			<Route path={`${path}/edit-profile`} exact component={EditProfile} />
			{userProviderId === 'password' && (
				<Route
					path={`${path}/delete-account`}
					exact
					component={DeleteAccount}
				/>
			)}
		</>
	);

	return (
		<Wrapper>
			{nestedRoutes}
			<PostsArea>
				<Post />
			</PostsArea>
			<SideBarWrapper>
				<SideBar title='Edit Profile'>
					<TabsWrapper>
						<Tabs>
							<Tab name='following'>
								{[1, 2, 3].map((val) => (
									<User key={val} />
								))}
							</Tab>
							<Tab name='followers'>
								{[1, 2, 3].map((val) => (
									<User key={val} />
								))}
							</Tab>
							<Tab name='Edit'>
								<EditLinksWrapper>
									<EditLink onClick={() => push(`${path}/edit-profile`)}>
										edit profile
									</EditLink>

									<EditLink onClick={() => push(`${path}/change-password`)}>
										change password
									</EditLink>

									<EditLink onClick={() => push(`${path}/change-email`)}>
										change email
									</EditLink>

									<EditLink
										onClick={() => {
											userProviderId === 'password'
												? push(`${path}/delete-account`)
												: deleteAccountStart();
										}}
									>
										delete account
									</EditLink>
								</EditLinksWrapper>
							</Tab>
						</Tabs>
					</TabsWrapper>
				</SideBar>
			</SideBarWrapper>
		</Wrapper>
	);
};

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	userProviderId: selectUserProviderId,
});

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	deleteAccountStart: (password) => dispatch(deleteAccountStart(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
