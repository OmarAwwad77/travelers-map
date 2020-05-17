import React from 'react';

import Post from './post/post';
import SideBar from './sidebar/sidebar';
import { Wrapper, PostsArea } from './news-feed.styles';

const NewsFeed = () => {
	return (
		<Wrapper>
			<PostsArea>
				<Post />
			</PostsArea>
			<SideBar />
		</Wrapper>
	);
};

export default NewsFeed;
