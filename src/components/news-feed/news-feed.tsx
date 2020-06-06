import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTheme } from 'styled-components';

import Post from '../post/post';
import SideBar from '../sidebar/sidebar';
import User from '../user/user';
import {
	Wrapper,
	PostsArea,
	SideBarWrapper,
	Loading,
	NoContent,
} from './news-feed.styles';
import { NewsFeedState } from '../../redux/news-feed/news-feed.types';
import { fetchPostsStart, fetchUsersStart } from '../../redux/root.actions';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../redux/root.reducer';
import {
	selectPosts,
	selectUsers,
	selectLoading,
} from '../../redux/news-feed/news-feed.selectors';
import { Dispatch } from 'redux';
import { UserState } from '../../redux/user/user.types';
import { selectUser } from '../../redux/user/user.selectors';

interface LinkStateToProps
	extends Pick<NewsFeedState, 'posts' | 'users' | 'loading'>,
		Pick<UserState, 'user'> {}
interface LinkDispatchToProps {
	fetchPostsStart: typeof fetchPostsStart;
	fetchUsersStart: typeof fetchUsersStart;
}
interface OwnProps {}
type Props = OwnProps & LinkDispatchToProps & LinkStateToProps;

const NewsFeed: React.FC<Props> = ({
	fetchPostsStart,
	fetchUsersStart,
	posts,
	users,
	loading,
	user: currentUser,
}) => {
	useEffect(() => {
		fetchPostsStart();
		fetchUsersStart();
	}, []);

	const { colors } = useTheme();
	if (loading) return <Loading color={colors.mainDarker} />;
	return (
		<Wrapper>
			<PostsArea>
				{posts.length === 0 && (
					<NoContent>start following users to get News Feed.</NoContent>
				)}
				{posts.map((post, i) => (
					<Post currentUser={currentUser!} key={post.placeId} post={post} />
				))}
			</PostsArea>
			<SideBarWrapper>
				<SideBar title='popular Travelers'>
					{users.map((user) => (
						<User
							followed={currentUser!.follows.includes(user.userId)}
							userImg={user.profileImg}
							displayName={user.displayName}
							key={user.userId}
							userId={user.userId}
						/>
					))}
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
	posts: selectPosts,
	users: selectUsers,
	user: selectUser,
	loading: selectLoading,
});

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	fetchPostsStart: () => dispatch(fetchPostsStart()),
	fetchUsersStart: () => dispatch(fetchUsersStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
