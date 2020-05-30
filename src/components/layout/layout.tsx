import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';

import { ReactComponent as ArrowUp } from '../../assets/icons/arrow-up.svg';
import Header from '../header/header';
import Footer from '../footer/footer';
import { createStructuredSelector } from 'reselect';
import { AppState } from '../../redux/root.reducer';
import { NewsFeedState } from '../../redux/news-feed/news-feed.types';
import { selectShowScrollButton } from '../../redux/news-feed/news-feed.selectors';
/**
 *
 *
 */
interface LinkStateToProps extends Pick<NewsFeedState, 'showScrollButton'> {}
interface OwnProps {}
type Props = OwnProps & LinkStateToProps;

const Layout: React.FC<Props> = ({ children, showScrollButton }) => {
	const { pathname } = useLocation();

	const [showHeader, setShowHeader] = useState(true);

	useEffect(() => {
		setShowHeader(!pathname.startsWith('/map'));
	}, [pathname]);

	return (
		<Wrapper>
			{showHeader && <Header />}
			<Content>{children}</Content>
			{showScrollButton && (
				<HashLink
					to='#header'
					scroll={(el) =>
						el.scrollIntoView({ behavior: 'smooth', block: 'start' })
					}
				>
					<ArrowUp />
				</HashLink>
			)}

			{showHeader && <Footer />}
		</Wrapper>
	);
};

const mapStateToProps = createStructuredSelector<
	AppState,
	OwnProps,
	LinkStateToProps
>({
	showScrollButton: selectShowScrollButton,
});

export default connect(mapStateToProps)(Layout);

export const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	background: ${(p) => p.theme.colors.main};
	position: relative;
`;

export const HashLink = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	overflow: hidden;

	position: fixed;
	bottom: 10%;
	right: 5%;
	width: 5rem;
	height: 5rem;
	background: ${(p) => p.theme.colors.secondary1};
	border-radius: 50%;
	svg {
		width: 70%;
		height: 70%;
	}
`;

export const Content = styled.main`
	position: relative;
	flex-grow: 1;
`;
