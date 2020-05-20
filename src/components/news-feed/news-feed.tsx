import React from 'react';

import Post from '../post/post';
import SideBar from '../sidebar/sidebar';
import User from '../user/user';
import { Wrapper, PostsArea, SideBarWrapper } from './news-feed.styles';

const NewsFeed = () => {
	return (
		<Wrapper>
			<PostsArea>
				<Post />
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

export default NewsFeed;
