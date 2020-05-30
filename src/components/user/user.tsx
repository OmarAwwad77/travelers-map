import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { Dispatch } from 'redux';
import { toggleFollowUserStart } from '../../redux/root.actions';
import {
	Wrapper,
	UserAvatar,
	UserContent,
	UserName,
	FollowButton,
} from './user.styles';

interface OwnProps {
	userImg: string;
	displayName: string;
	userId: string;
	followed: boolean;
}
interface LinkDispatchToProps {
	toggleFollowUserStart: typeof toggleFollowUserStart;
}

type Props = OwnProps & LinkDispatchToProps;
const User: React.FC<Props> = ({
	userImg,
	userId,
	displayName,
	followed,
	toggleFollowUserStart,
}) => {
	const { push } = useHistory();

	return (
		<Wrapper>
			<UserAvatar onClick={() => push(`/user/${userId}`)} url={userImg} />
			<UserContent onClick={() => push(`/user/${userId}`)}>
				<UserName>{displayName}</UserName>
				<FollowButton
					onClick={(e) => {
						e.stopPropagation();
						toggleFollowUserStart(userId, followed);
					}}
				>
					{followed ? 'UnFollow' : 'Follow'}
				</FollowButton>
			</UserContent>
		</Wrapper>
	);
};

const mapDispatchToProps = (dispatch: Dispatch): LinkDispatchToProps => ({
	toggleFollowUserStart: (userId, followed) =>
		dispatch(toggleFollowUserStart(userId, followed)),
});

export default connect(null, mapDispatchToProps)(User);
