import React from 'react';

import {
	Wrapper,
	UserAvatar,
	UserContent,
	UserName,
	FollowButton,
} from './user.styles';

const User = () => {
	return (
		<Wrapper>
			<UserAvatar url='' />
			<UserContent>
				<UserName>Omar Awwad</UserName>
				<FollowButton>Follow</FollowButton>
			</UserContent>
		</Wrapper>
	);
};

export default User;
