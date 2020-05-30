import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import styled from 'styled-components';

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
} from '../../redux/news-feed/news-feed.selectors';
import { PostsArea } from '../../components/news-feed/news-feed.styles';
import Post from '../../components/post/post';
import { selectUser } from '../../redux/user/user.selectors';
import { UserState } from '../../redux/user/user.types';

const Wrapper = styled.section`
	display: flex;
`;
const SidebarWrapper = styled.div`
	width: 30%;
	text-align: center;
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
	extends Pick<NewsFeedState, 'strangerPosts' | 'users'>,
		Pick<UserState, 'user'> {}
interface OwnProps {}
type Props = LinkDispatchToProps & LinkStateToProps & OwnProps;

const StrangerProfile: React.FC<Props> = ({
	strangerPosts,
	fetchUserPostsStart,
	toggleFollowUserStart,
	user,
	users,
}) => {
	const { id } = useParams<{ id: string }>();
	let url: string | undefined;
	let name: string | undefined;
	if (id) {
		const stranger = users.find((user) => user.userId === id);
		if (stranger) {
			url = stranger.profileImg;
			name = stranger.displayName;
		} else {
			// get user from db
		}
	}
	useEffect(() => {
		fetchUserPostsStart(id);
	}, []);

	return (
		<Wrapper>
			{/* {(!url || !name) && <Redirect to='/' />} */}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(StrangerProfile);
