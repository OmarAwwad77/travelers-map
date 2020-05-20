import React, { useState } from 'react';

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
}
type Props = OwnProps;

const Comment: React.FC<Props> = ({ nested }) => {
	const [replying, setReplying] = useState(false);
	const [viewReplies, setViewReplies] = useState(false);
	const comments = [1, 2];

	return (
		<Wrapper>
			<Grid nested={nested}>
				<CommentAvatar />
				<CommentDate>25 minutes ago</CommentDate>
				<CommentOwner>omar awwad</CommentOwner>
				<CommentText>
					this is a comment left by this user this is a comment left by this
					user this is a comment left by this user
				</CommentText>
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
			{!nested && viewReplies && comments.map((comm) => <Comment nested />)}
		</Wrapper>
	);
};

export default Comment;
