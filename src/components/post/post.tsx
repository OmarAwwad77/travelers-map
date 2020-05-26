import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ClockIcon } from '../../assets/icons/clock.svg';
import { ReactComponent as UnLikedIcon } from '../../assets/icons/heart-empty.svg';
import { ReactComponent as LikedIcon } from '../../assets/icons/heart-solid.svg';
import { ReactComponent as CommentIcon } from '../../assets/icons/comments.svg';
import { ReactComponent as InfoIcon } from '../../assets/icons/info.svg';
import { ReactComponent as MapIcon } from '../../assets/icons/place.svg';
import Slider from '../slider/slider';
import Comment from '../comment/comment';
import AddComment from '../add-comment/add-comment';
import TimeAgo from 'react-timeago';

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
	ShowMore,
} from './post.styles';
import {
	Post as PostType,
	Comment as CommentType,
} from '../../redux/news-feed/news-feed.types';
import { Dispatch } from 'redux';
import { likePostToggleStart } from '../../redux/root.actions';
import { User } from '../../redux/user/user.types';
import ViewOnMap from '../view-on-map/view-on-map';
import { Coords } from '../../redux/map/map.types';
import PlaceDetails from '../place-details/place-details';

interface OwnProps {
	post: PostType;
	currentUser: User;
}
interface LinkDispatchToProps {
	likePostToggleStart: typeof likePostToggleStart;
}
type Props = OwnProps & LinkDispatchToProps;

const Post: React.FC<Props> = ({ post, likePostToggleStart, currentUser }) => {
	const {
		placeImages,
		placeName,
		likes,
		createdAt,
		userDisplayName,
		userImg,
		comments,
		placeId,
		placeCoords,
		userId, //  post owner
	} = post;

	const [showViewOnMap, setShowViewOnMap] = useState(false);

	const [showPlaceInfo, setShowPlaceInfo] = useState(false);

	const [showComments, setShowComments] = useState(false);

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
			{showViewOnMap && (
				<ViewOnMap
					targetUserId={userId}
					placeToShow={placeCoords}
					backDropOnClick={() => setShowViewOnMap(false)}
				/>
			)}
			{showPlaceInfo && (
				<PlaceDetails
					backDropOnClick={() => setShowPlaceInfo(false)}
					post={post}
				/>
			)}
			<PostHeader>
				<PostAvatar url={userImg} />
				<PostOwner>{userDisplayName}</PostOwner>
				<IconWithText>
					<ClockIcon />
					<TimeAgo date={createdAt} />
				</IconWithText>
			</PostHeader>
			<PostContent>
				<Slider urls={placeImages} width='100%' height='100%' />
			</PostContent>
			<PostFooter>
				<IconWithText gridArea='likes'>
					{likes.includes(currentUser.uid) ? (
						<LikedIcon
							onClick={() =>
								likePostToggleStart(placeId.toString(), userId, true)
							}
						/>
					) : (
						<UnLikedIcon
							onClick={() =>
								likePostToggleStart(placeId.toString(), userId, false)
							}
						/>
					)}
					{likes.length}
				</IconWithText>
				<PlaceName>{placeName}</PlaceName>
				<IconWithText gridArea='comments'>
					<CommentIcon onClick={() => setShowComments(!showComments)} />{' '}
					{getCommentsCount()}
				</IconWithText>
				<IconWithText gridArea='map'>
					<MapIcon onClick={() => setShowViewOnMap(true)} /> map
				</IconWithText>
				<IconWithText gridArea='more'>
					<InfoIcon onClick={() => setShowPlaceInfo(true)} /> more
				</IconWithText>
			</PostFooter>
			<Divider />
			<AddComment
				onCommentAdded={() => setShowComments(true)}
				postId={placeId.toString()}
				replyToId={placeId.toString()}
			/>
			<Divider />
			{(!showComments ? comments.slice(0, 1) : comments).map((comment) => (
				<Comment
					key={comment.commentId}
					userImg={comment.userImg}
					comment={comment.comment}
					userName={comment.userName}
					createdAt={comment.createdAt}
					comments={comment.comments}
					commentId={comment.commentId}
					postId={placeId.toString()}
				/>
			))}
			{comments.length > 1 && (
				<ShowMore onClick={() => setShowComments(!showComments)}>
					show more...
				</ShowMore>
			)}
		</Wrapper>
	);
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	likePostToggleStart: (postId, postOwnerId, liked) =>
		dispatch(likePostToggleStart(postId, postOwnerId, liked)),
});

export default connect(null, mapDispatchToProps)(Post);
