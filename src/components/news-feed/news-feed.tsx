import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Post from '../post/post';
import SideBar from '../sidebar/sidebar';
import User from '../user/user';
import { Wrapper, PostsArea, SideBarWrapper } from './news-feed.styles';
import { NewsFeedState } from '../../redux/news-feed/news-feed.types';
import { fetchPostsStart } from '../../redux/root.actions';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../redux/root.reducer';
import { selectPosts } from '../../redux/news-feed/news-feed.selectors';
import { Dispatch } from 'redux';

interface LinkStateToProps extends Pick<NewsFeedState, 'posts'> {}
interface LinkDispatchToProps {
	fetchPostsStart: typeof fetchPostsStart;
}
interface OwnProps {}
type Props = OwnProps & LinkDispatchToProps & LinkStateToProps;

const NewsFeed: React.FC<Props> = ({ fetchPostsStart, posts }) => {
	useEffect(() => {
		fetchPostsStart();
	}, []);

	return (
		<Wrapper>
			<PostsArea>
				{posts.map((post, i) => (
					<Post key={post.placeId} post={post} />
				))}
			</PostsArea>
			<SideBarWrapper>
				<SideBar title='popular Travelers'>
					{[1, 2].map((val) => (
						<User key={val} />
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
});

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	fetchPostsStart: () => dispatch(fetchPostsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
