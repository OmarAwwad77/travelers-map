import React from 'react';
import {
	Wrapper,
	SidBarTitle,
	User,
	UserAvatar,
	UserContent,
	UserName,
	FollowButton,
	Divider,
} from './sidebar.styles';

const SideBar = () => {
	return (
		<Wrapper>
			<SidBarTitle>Popular travelers</SidBarTitle>
			<User>
				<UserAvatar />
				<UserContent>
					<UserName>Omar Awwad</UserName>
					<FollowButton>Follow</FollowButton>
				</UserContent>
			</User>
			<Divider />
			<User>
				<UserAvatar />
				<UserContent>
					<UserName>Omar Awwad</UserName>
					<FollowButton>Follow</FollowButton>
				</UserContent>
			</User>
		</Wrapper>
	);
};

export default SideBar;
