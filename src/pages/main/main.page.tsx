import React from 'react';

import NewsFeed from '../../components/news-feed/news-feed';
import Hero from '../../components/hero/hero';
import ShowCase from '../../components/showcase/show-case';
import { User } from '../../redux/user/user.types';

const Main: React.FC<{ user: User | null }> = ({ user }) => {
	return user ? (
		<NewsFeed />
	) : (
		<>
			<Hero />
			<ShowCase />
		</>
	);
};

export default Main;
