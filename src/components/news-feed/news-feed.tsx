import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Post from '../post/post';
import SideBar from '../sidebar/sidebar';
import User from '../user/user';
import { Wrapper, PostsArea, SideBarWrapper } from './news-feed.styles';
import { NewsFeedState } from '../../redux/news-feed/news-feed.types';
import { fetchPlacesStart } from '../../redux/root.actions';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../redux/root.reducer';
import { selectPlaces } from '../../redux/news-feed/news-feed.selectors';
import { Dispatch } from 'redux';

interface LinkStateToProps extends Pick<NewsFeedState, 'places'> {}
interface LinkDispatchToProps {
	fetchPlacesStart: typeof fetchPlacesStart;
}
interface OwnProps {}
type Props = OwnProps & LinkDispatchToProps & LinkStateToProps;

const NewsFeed: React.FC<Props> = ({ fetchPlacesStart, places }) => {
	useEffect(() => {
		fetchPlacesStart();
	}, []);

	return (
		<Wrapper>
			<PostsArea>
				{places.map(
					(place, i) => i <= 1 && <Post key={place.placeId} place={place} />
				)}
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
	places: selectPlaces,
});

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	fetchPlacesStart: () => dispatch(fetchPlacesStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
