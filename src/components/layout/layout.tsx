import React from 'react';
import styled from 'styled-components';

import Header from '../header/header';
import Footer from '../footer/footer';

const Layout: React.FC<{}> = ({ children }) => {
	return (
		<Wrapper>
			<Header />
			<Content>{children}</Content>
			<Footer />
		</Wrapper>
	);
};

export default Layout;

export const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background: ${(p) => p.theme.colors.main};
`;

export const Content = styled.main`
	flex-grow: 1;
`;
