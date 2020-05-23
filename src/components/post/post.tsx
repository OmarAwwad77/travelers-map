import React from 'react';

import { ReactComponent as ClockIcon } from '../../assets/icons/clock.svg';
import { ReactComponent as LikeIcon } from '../../assets/icons/heart-empty.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comments.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/info.svg';
import { ReactComponent as MapIcon } from '../../assets/icons/place.svg';
import paris from '../../assets/images/paris.png';
import Slider from '../slider/slider';
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
import {
	Post as PostType,
	Comment as CommentType,
} from '../../redux/news-feed/news-feed.types';

interface OwnProps {
	post: PostType;
}
type Props = OwnProps;

const Post: React.FC<Props> = ({ post }) => {
	const {
		placeImages,
		placeName,
		likes,
		createdAt,
		userDisplayName,
		userImg,
		comments,
	} = post;

	const getCommentsCount = () => {
		const countArr = (comment: CommentType) => {
			let count = 1;
			if (comment.comments.length === 0) return count;
			comment.comments.forEach(
				(comment) => (count = count + countArr(comment))
			);
			return count;
		};
		let count = 0;
		comments.forEach((comm) => (count += countArr(comm)));
		return count;
	};
	return (
		<Wrapper>
			<PostHeader>
				<PostAvatar url={userImg} />
				<PostOwner>{userDisplayName}</PostOwner>
				<IconWithText>
					<ClockIcon /> {createdAt}
				</IconWithText>
			</PostHeader>
			<PostContent>
				<Slider urls={placeImages} width='100%' height='100%' />
			</PostContent>
			<PostFooter>
				<IconWithText gridArea='likes'>
					<LikeIcon /> {likes.length}
				</IconWithText>
				<PlaceName>{placeName}</PlaceName>
				<IconWithText gridArea='comments'>
					<CommentIcon /> {getCommentsCount()}
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
			{comments.map((comment) => (
				<Comment
					key={comment.commentId}
					userImg={comment.userImg}
					comment={comment.comment}
					userName={comment.userName}
					createdAt={comment.createdAt}
					comments={comment.comments}
				/>
			))}
		</Wrapper>
	);
};

export default Post;
