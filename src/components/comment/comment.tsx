import React, { useState } from 'react';
import { Comment as CommentType } from '../../redux/news-feed/news-feed.types';
import TimeAgo from 'react-timeago';

import AddComment from '../add-comment/add-comment';
import {
	Wrapper,
	Grid,
	CommentAvatar,
	CommentDate,
	CommentText,
	CommentFooter,
	CommentOwner,
} from './comment.styles';

interface OwnProps {
	nested?: boolean;
	userImg: string;
	userName: string;
	comment: string;
	comments: CommentType[];
	createdAt: number;
	commentId: string;
	postId: string;
}
type Props = OwnProps;

const Comment: React.FC<Props> = ({
	nested,
	userName,
	comment,
	userImg,
	createdAt,
	comments,
	commentId,
	postId,
}) => {
	const [replying, setReplying] = useState(false);
	const [viewReplies, setViewReplies] = useState(false);

	return (
		<Wrapper>
			<Grid nested={nested}>
				<CommentAvatar url={userImg} />
				<CommentDate>
					<TimeAgo date={createdAt} />
				</CommentDate>
				<CommentOwner>{userName}</CommentOwner>
				<CommentText>{comment}</CommentText>
				{!nested && (
					<CommentFooter>
						{comments.length !== 0 && (
							<span
								style={{ marginRight: '1rem' }}
								onClick={() => setViewReplies(!viewReplies)}
							>
								View replies
							</span>
						)}
						<span onClick={() => setReplying(!replying)}>reply</span>
					</CommentFooter>
				)}
			</Grid>
			{replying && !nested && (
				<AddComment
					postId={postId}
					replyToId={commentId}
					onCommentAdded={() => {
						setReplying(false);
						setViewReplies(true);
					}}
				/>
			)}
			{!nested &&
				viewReplies &&
				comments.map((comment) => (
					<Comment key={comment.commentId} {...comment} nested />
				))}
		</Wrapper>
	);
};

export default Comment;
