import React from 'react';

import {
	FooterWrapper,
	FooterItem,
	GitHubIconStyled,
	GitHubAccount,
	EmailIconStyled,
} from './footer.styles';

const footer = () => {
	return (
		<FooterWrapper>
			<FooterItem>
				<GitHubIconStyled />
				<GitHubAccount href='https://github.com/OmarAwwad77' target='_black'>
					GitHubAccount
				</GitHubAccount>
			</FooterItem>
			<FooterItem>
				<EmailIconStyled />
				<span> OmarAwwad010@gmail.com </span>
			</FooterItem>
		</FooterWrapper>
	);
};

export default footer;
