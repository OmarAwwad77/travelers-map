import styled from 'styled-components';

export const Wrapper = styled.section`
	display: flex;
`;

export const TabsWrapper = styled.div`
	margin: 0 2rem;
	max-width: 40rem;
`;

export const SideBarWrapper = styled.div`
	width: 30%;
	padding: 5rem 0;
`;

export const EditLink = styled.span`
	text-transform: capitalize;
	cursor: pointer;
	&:not(:last-child) {
		margin-bottom: 4rem;
	}
	&:hover {
		text-decoration: underline;
	}
`;

export const EditLinksWrapper = styled.div`
	padding: 2rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
