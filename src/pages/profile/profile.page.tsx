import React from 'react';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';

import { PostsArea } from '../../components/news-feed/news-feed.styles';
import SideBar from '../../components/sidebar/sidebar';
import Post from '../../components/post/post';
import User from '../../components/user/user';
import Tabs, { Tab } from '../../components/tabs/tabs';
import ChangeEmail from '../../components/change-email/change-email';
import ChangePassword from '../../components/change-password/change-password';
import DeleteAccount from '../../components/delete-account/delete-account';
import EditProfile from '../../components/edit-profile/edit-profile';

import {
	EditLink,
	Wrapper,
	TabsWrapper,
	SideBarWrapper,
	EditLinksWrapper,
} from './profile.page.styles';

interface OwnProps {}
type Props = OwnProps;
const Profile: React.FC<Props> = () => {
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
			<Route path={`${path}/delete-account`} exact component={DeleteAccount} />
			{/* {userProviderId === 'password' && (
				<Route
					path={`${path}/delete-account`}
					exact
					component={DeleteAccount}
				/>
			)} */}
		</>
	);

	return (
		<Wrapper>
			{nestedRoutes}
			<PostsArea>{/* <Post /> */}</PostsArea>
			<SideBarWrapper>
				<SideBar title='Edit Profile'>
					<TabsWrapper>
						<Tabs>
							{/* <Tab name='following'>
								{[1, 2, 3].map((val) => (
									<User key={val} />
								))}
							</Tab>
							<Tab name='followers'>
								{[1, 2, 3].map((val) => (
									<User key={val} />
								))}
							</Tab> */}
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
										// onClick={() => {
										// 	userProviderId === 'password'
										// 		? push(`${path}/delete-account`)
										// 		: deleteAccountStart();
										// }}
										onClick={() => {
											push(`${path}/delete-account`);
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

export default Profile;
