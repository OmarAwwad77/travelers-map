import React from 'react';

import { ReactComponent as ClockIcon } from '../../../assets/icons/clock.svg';
import { ReactComponent as LikeIcon } from '../../../assets/icons/heart-empty.svg';
import { ReactComponent as CommentIcon } from '../../../assets/icons/comments.svg';
import { ReactComponent as InfoIcon } from '../../../assets/icons/info.svg';
import { ReactComponent as MapIcon } from '../../../assets/icons/place.svg';
import paris from '../../../assets/images/paris.png';
import Slider from '../../slider/slider';
import Comment from '../comment/comment';
import AddComment from '../add-comment/add-comment';
import {
	Wrapper,
	PostHeader,
	PostContent,
	PostFooter,
	PostAvatar,
	PostOwner,
	IconWithText,
	PlaceName,
	Divider,
} from './post.styles';

const Post = () => {
	return (
		<Wrapper>
			<PostHeader>
				<PostAvatar />
				<PostOwner>Omar Awwad</PostOwner>
				<IconWithText>
					<ClockIcon /> 1 hour ago
				</IconWithText>
			</PostHeader>
			<PostContent>
				<Slider urls={[paris]} width='100%' height='100%' />
			</PostContent>
			<PostFooter>
				<IconWithText gridArea='likes'>
					<LikeIcon /> 3.5k
				</IconWithText>
				<PlaceName>Paris, France</PlaceName>
				<IconWithText gridArea='comments'>
					<CommentIcon /> 905
				</IconWithText>
				<IconWithText gridArea='map'>
					<MapIcon /> map
				</IconWithText>
				<IconWithText gridArea='more'>
					<InfoIcon /> more
				</IconWithText>
			</PostFooter>
			<Divider />
			<AddComment url='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' />
			<Divider />
			<Comment />
		</Wrapper>
	);
};

export default Post;
