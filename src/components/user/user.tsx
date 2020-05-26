import React from 'react';
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
	return (
		<Wrapper>
			<UserAvatar url={userImg} />
			<UserContent>
				<UserName>{displayName}</UserName>
				<FollowButton onClick={() => toggleFollowUserStart(userId, followed)}>
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
