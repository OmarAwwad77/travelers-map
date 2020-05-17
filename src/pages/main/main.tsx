import React from 'react';

import NewsFeed from '../../components/news-feed/news-feed';
import Hero from '../../components/hero/hero';
import ShowCase from '../../components/showcase/show-case';

const Main = () => {
	const user = true;
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
