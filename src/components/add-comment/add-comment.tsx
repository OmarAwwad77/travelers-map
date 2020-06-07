import React, { useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useLocation } from 'react-router-dom';

import { Wrapper, Avatar, ButtonsWrapper, Button } from './add-comment.styles';
import { addCommentStart } from '../../redux/root.actions';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../redux/root.reducer';
import { selectUser } from '../../redux/user/user.selectors';
import { UserState } from '../../redux/user/user.types';

interface OwnProps {
	replyToId: string;
	postId: string;
	onCommentAdded?: () => void;
}
interface LinkDispatchToProps {
	addCommentStart: typeof addCommentStart;
}
interface LinkStateToProps extends Pick<UserState, 'user'> {}
type Props = OwnProps & LinkDispatchToProps & LinkStateToProps;

const AddComment: React.FC<Props> = ({
	user,
	replyToId,
	addCommentStart,
	postId,
	onCommentAdded,
}) => {
	const [showButtons, setShowButtons] = useState(false);
	const [comment, setComment] = useState('');

	const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setComment(val);
	};

	return (
		<Wrapper>
			<Avatar url={user!.url} />
			<input
				type='text'
				value={comment}
				onChange={inputOnChange}
				onFocus={() => setShowButtons(true)}
				placeholder='Add a Comment'
			/>
			{showButtons && (
				<ButtonsWrapper>
					<Button onClick={() => setShowButtons(false)}>Cancel</Button>
					<Button
						onClick={() => {
							addCommentStart(replyToId, comment, postId);
							onCommentAdded?.();
							setShowButtons(false);
							setComment('');
						}}
					>
						Comment
					</Button>
				</ButtonsWrapper>
			)}
		</Wrapper>
	);
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	addCommentStart: (replayToId, comment, postId) =>
		dispatch(addCommentStart(replayToId, comment, postId)),
});

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	user: selectUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
