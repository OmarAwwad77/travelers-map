import React, { useState, useEffect } from 'react';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import {
	PostsArea,
	Loading,
	NoContent,
} from '../../components/news-feed/news-feed.styles';
import SideBar from '../../components/sidebar/sidebar';
import Post from '../../components/post/post';
import User from '../../components/user/user';
import Tabs, { Tab } from '../../components/tabs/tabs';
import ChangeEmail from '../../components/change-email/change-email';
import ChangePassword from '../../components/change-password/change-password';
import DeleteAccount from '../../components/delete-account/delete-account';
import EditProfile from '../../components/edit-profile/edit-profile';
import { fetchUserPostsStart } from '../../redux/root.actions';
import {
	EditLink,
	Wrapper,
	TabsWrapper,
	SideBarWrapper,
	EditLinksWrapper,
} from './profile.page.styles';
import { Dispatch } from 'redux';
import { UserState, DbUser } from '../../redux/user/user.types';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../redux/root.reducer';
import {
	selectUser,
	selectUserProviderId,
} from '../../redux/user/user.selectors';
import {
	NewsFeedState,
	User as UserType,
} from '../../redux/news-feed/news-feed.types';
import {
	selectMyPosts,
	selectLoading,
} from '../../redux/news-feed/news-feed.selectors';
import { fetchFollowers, fetchFollows } from '../../firebase/firebase.utils';
import { useTheme } from 'styled-components';

/**
 *
 */
interface LinkDispatchToProps {
	fetchUserPostsStart: typeof fetchUserPostsStart;
}
interface LinkStateToProps
	extends Pick<UserState, 'user' | 'loading'>,
		Pick<NewsFeedState, 'myPosts'> {
	userProviderId: string;
}
interface OwnProps {}
type Props = OwnProps & LinkDispatchToProps & LinkStateToProps;
const Profile: React.FC<Props> = ({
	fetchUserPostsStart,
	user,
	myPosts,
	loading,
	userProviderId,
}) => {
	const { path } = useRouteMatch();
	const { push } = useHistory();
	const { uid, followers, follows } = user!;
	const [followersState, setFollowersState] = useState<UserType[]>([]);
	const [followingState, setFollowingState] = useState<UserType[]>([]);

	useEffect(() => {
		fetchUserPostsStart(uid, true);

		async function setFollowers() {
			const docs = await fetchFollowers(followers);
			const followersArr = docs.map<UserType>((doc) => ({
				userId: doc.id,
				...(doc.data() as DbUser),
			}));
			setFollowersState(followersArr);
		}

		async function setFollows() {
			const docs = await fetchFollows(follows);
			const followsArr = docs.map<UserType>((doc) => ({
				userId: doc.id,
				...(doc.data() as DbUser),
			}));
			setFollowingState(followsArr);
		}

		setFollows();
		setFollowers();
	}, []);

	const nestedRoutes = (
		<>
			{userProviderId === 'password' && (
				<>
					<Route
						path={`${path}/change-password`}
						exact
						component={ChangePassword}
					/>
					<Route path={`${path}/change-email`} exact component={ChangeEmail} />
				</>
			)}

			<Route path={`${path}/edit-profile`} exact component={EditProfile} />
			<Route path={`${path}/delete-account`} exact component={DeleteAccount} />
		</>
	);

	const { colors } = useTheme();
	if (loading) return <Loading color={colors.mainDarker} />;

	return (
		<Wrapper>
			{nestedRoutes}
			<PostsArea>
				{myPosts.length === 0 && <NoContent>you haven't posted yet </NoContent>}
				{myPosts.map((post) => (
					<Post currentUser={user!} key={post.placeId} post={post} />
				))}
			</PostsArea>
			<SideBarWrapper>
				<SideBar title='Edit Profile'>
					<TabsWrapper>
						<Tabs>
							<Tab name='Edit'>
								<EditLinksWrapper>
									<EditLink onClick={() => push(`${path}/edit-profile`)}>
										edit profile
									</EditLink>

									<EditLink
										{...(userProviderId !== 'password' && {
											disabled: 'You Signed In With Google',
										})}
										onClick={() =>
											userProviderId === 'password' &&
											push(`${path}/change-password`)
										}
									>
										change password
									</EditLink>

									<EditLink
										{...(userProviderId !== 'password' && {
											disabled: 'You Signed In With Google',
										})}
										onClick={() =>
											userProviderId === 'password' &&
											push(`${path}/change-email`)
										}
									>
										change email
									</EditLink>

									<EditLink
										onClick={() => {
											push(`${path}/delete-account`);
										}}
									>
										delete account
									</EditLink>
								</EditLinksWrapper>
							</Tab>
							<Tab name='following'>
								{followingState.length === 0 && (
									<NoContent center fontSize='1.5rem'>
										no users yet
									</NoContent>
								)}
								{followingState.map(({ userId, displayName, profileImg }) => (
									<User
										displayName={displayName}
										userImg={profileImg}
										followed={follows.includes(userId)}
										userId={userId}
										key={userId}
									/>
								))}
							</Tab>
							<Tab name='followers'>
								{followersState.length === 0 && (
									<NoContent center fontSize='1.5rem'>
										no followers yet
									</NoContent>
								)}
								{followersState.map(({ userId, displayName, profileImg }) => (
									<User
										displayName={displayName}
										userImg={profileImg}
										followed={follows.includes(userId)}
										userId={userId}
										key={userId}
									/>
								))}
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
	user: selectUser,
	userProviderId: selectUserProviderId,
	myPosts: selectMyPosts,
	loading: selectLoading,
});
const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	fetchUserPostsStart: (userId, forCurrentUser) =>
		dispatch(fetchUserPostsStart(userId, forCurrentUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
