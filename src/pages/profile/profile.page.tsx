import React from 'react';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';

import { PostsArea } from '../../components/news-feed/news-feed.styles';
import SideBar from '../../components/sidebar/sidebar';
import Post from '../../components/post/post';
import User from '../../components/user/user';
import Tabs, { Tab } from '../../components/tabs/tabs';

import ChangePassword from '../../components/change-password/change-password';
import {
	EditLink,
	Wrapper,
	TabsWrapper,
	SideBarWrapper,
	EditLinksWrapper,
} from './profile.page.styles';

const Profile = () => {
	const { path } = useRouteMatch();
	const { push } = useHistory();
	const nestedRoutes = (
		<>
			<Route path={`${path}/change-password`} component={ChangePassword} />
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
									<EditLink onClick={() => push(`${path}/change-password`)}>
										change password
									</EditLink>
									<EditLink>change email</EditLink>
									<EditLink>edit profile info</EditLink>
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
