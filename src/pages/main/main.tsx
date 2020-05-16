import React from 'react';
import styled from 'styled-components';

import Header from '../../components/header/header';
import Hero from '../../components/hero/hero';
import ShowCase from '../../components/showcase/show-case';

const Main = () => {
	return (
		<Layout>
			<Header />
			<Content>
				<Hero />
				<ShowCase />
			</Content>
			<Footer />
		</Layout>
	);
};

export default Main;

export const Wrapper = styled.section``;

export const Layout = styled.section`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background: ${(p) => p.theme.colors.main};
`;

export const Content = styled.div`
	flex-grow: 1;
	/* padding: 0 1rem; */
`;

export const Footer = styled.footer`
	width: 100%;
	height: 10rem;
	background: ${(p) => p.theme.colors.secondary2};
`;
