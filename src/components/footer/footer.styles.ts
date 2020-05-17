import styled, { css } from 'styled-components';

import { ReactComponent as GitHubIcon } from '../../assets/icons/github.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/envelope.svg';

export const FooterWrapper = styled.section`
	width: 100%;
	height: 30rem;
	grid-area: footer;
	background-color: ${(p) => p.theme.colors.secondary2};
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
`;

export const FooterItem = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	color: ${(p) => p.theme.colors.mainDarker};
	fill: ${(p) => p.theme.colors.mainDarker};
	font-size: 1.4rem;
`;

export const IconStyled = css`
	width: 2.5rem;
	height: 2.5rem;
	margin-right: 1rem;
`;

export const GitHubIconStyled = styled(GitHubIcon)`
	${IconStyled}
`;

export const EmailIconStyled = styled(EmailIcon)`
	${IconStyled}
`;

export const GitHubAccount = styled.a`
	text-decoration: none;
	cursor: pointer;
	color: ${(p) => p.theme.colors.mainDarker};
`;
