import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import styled, { useTheme, css } from 'styled-components';

import {
	UserAvatar,
	UserName,
	FollowButton,
} from '../../components/user/user.styles';
import SideBar from '../../components/sidebar/sidebar';
import { Dispatch } from 'redux';
import {
	fetchUserPostsStart,
	toggleFollowUserStart,
} from '../../redux/root.actions';
import { NewsFeedState } from '../../redux/news-feed/news-feed.types';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../redux/root.reducer';
import {
	selectStrangerPosts,
	selectUsers,
	selectLoading,
} from '../../redux/news-feed/news-feed.selectors';
import {
	PostsArea,
	Loading,
} from '../../components/news-feed/news-feed.styles';
import Post from '../../components/post/post';
import { selectUser } from '../../redux/user/user.selectors';
import { UserState, DbUser } from '../../redux/user/user.types';
import MediaQueries from '../../styles/media-queries';

const Wrapper = styled.section`
	display: flex;

	${MediaQueries.BREAK_POINT_850_PX(css`
		flex-direction: column-reverse;
		padding: 0.5rem;
		margin-top: 5rem;
	`)}
`;
const SidebarWrapper = styled.div`
	width: 30%;
	text-align: center;
	${MediaQueries.BREAK_POINT_850_PX(css`
		margin: 0 auto;
		width: 50%;
		padding: 0;
	`)}
`;

const Avatar = styled(UserAvatar)<{ url: string }>`
	margin: 0 auto;
	grid-area: avatar;
	width: 17rem;
	height: 17rem;
	cursor: initial;
`;

const Name = styled(UserName)`
	grid-area: name;
	align-self: end;
	cursor: initial;
`;

const Button = styled(FollowButton)`
	grid-area: button;
	justify-self: start;
	align-self: center;
`;

interface LinkDispatchToProps {
	fetchUserPostsStart: typeof fetchUserPostsStart;
	toggleFollowUserStart: typeof toggleFollowUserStart;
}
interface LinkStateToProps
	extends Pick<NewsFeedState, 'strangerPosts' | 'users' | 'loading'>,
		Pick<UserState, 'user'> {}
interface OwnProps {}
type Props = LinkDispatchToProps & LinkStateToProps & OwnProps;

const StrangerProfile: React.FC<Props> = ({
	strangerPosts,
	fetchUserPostsStart,
	toggleFollowUserStart,
	user,
	users,
	loading,
}) => {
	const { id } = useParams<{ id: string }>();
	let url: string | undefined;
	let name: string | undefined;
	if (id) {
		const stranger = users.find((user) => user.userId === id);
		if (stranger) {
			url = stranger.profileImg;
			name = stranger.displayName;
		}
	}
	useEffect(() => {
		fetchUserPostsStart(id);
	}, []);

	const { colors } = useTheme();

	if (loading) return <Loading color={colors.mainDarker} />;

	return (
		<Wrapper>
			{(!url || !name) && <Redirect to='/' />}
			<PostsArea>
				{strangerPosts.map((post) => (
					<Post currentUser={user!} key={post.placeId} post={post} />
				))}
			</PostsArea>
			<SidebarWrapper>
				<SideBar withDivider>
					<Avatar url={url!} />
					<Name>{name!}</Name>

					<Button
						onClick={() =>
							toggleFollowUserStart(id, user!.follows.includes(id))
						}
					>
						{user!.follows.includes(id) ? 'UnFollow' : 'Follow'}
					</Button>
				</SideBar>
			</SidebarWrapper>
		</Wrapper>
	);
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	fetchUserPostsStart: (userId) => dispatch(fetchUserPostsStart(userId)),
	toggleFollowUserStart: (userId, followed) =>
		dispatch(toggleFollowUserStart(userId, followed)),
});

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	strangerPosts: selectStrangerPosts,
	user: selectUser,
	users: selectUsers,
	loading: selectLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(StrangerProfile);
