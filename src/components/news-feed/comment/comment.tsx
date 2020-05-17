import React from 'react';

import {
	Wrapper,
	CommentAvatar,
	CommentDate,
	CommentText,
	CommentFooter,
} from './comment.styles';

const Comment = () => {
	return (
		<Wrapper>
			<CommentAvatar />
			<CommentDate>25 minutes ago</CommentDate>
			<CommentText>
				this is a comment left by this user this is a comment left by this user
				this is a comment left by this user
			</CommentText>
			<CommentFooter>
				<span>View replies</span>
				<span>reply</span>
			</CommentFooter>
		</Wrapper>
	);
};

export default Comment;
