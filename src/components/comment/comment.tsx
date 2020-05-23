import React, { useState } from 'react';
import { Comment as CommentType } from '../../redux/news-feed/news-feed.types';

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
}
type Props = OwnProps;

const Comment: React.FC<Props> = ({
	nested,
	userName,
	comment,
	userImg,
	createdAt,
	comments,
}) => {
	const [replying, setReplying] = useState(false);
	const [viewReplies, setViewReplies] = useState(false);

	return (
		<Wrapper>
			<Grid nested={nested}>
				<CommentAvatar url={userImg} />
				<CommentDate>{createdAt}</CommentDate>
				<CommentOwner>{userName}</CommentOwner>
				<CommentText>{comment}</CommentText>
				{!nested && (
					<CommentFooter>
						<span onClick={() => setViewReplies(!viewReplies)}>
							View replies
						</span>
						<span onClick={() => setReplying(!replying)}>reply</span>
					</CommentFooter>
				)}
			</Grid>
			{replying && !nested && (
				<AddComment url='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' />
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
