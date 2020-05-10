import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	background: #fff;
	border-radius: 5px;
	width: 35rem;
	height: 40rem;
	padding: 0 1rem;
`;

export const flexChildrenStyles = css`
	height: 3rem;
	width: 100%;
	max-width: 25rem;
`;

export const TripNameWrapper = styled.div`
	text-align: center;
`;

export const DropDownWrapper = styled.div`
	${flexChildrenStyles}
`;

export const Or = styled.span`
	display: inline-block;
	font-weight: bold;
	margin: 0.5rem 0;
	color: #7070ff;
`;

export const TripInput = styled.input`
	font-family: inherit;
	font-size: inherit;
	border: 1px solid rgba(0, 0, 0, 0.2);
	outline: none;
	padding: 1rem 2rem;
	${flexChildrenStyles}
`;

export const TripDescription = styled.textarea`
	font-family: inherit;
	font-size: 1.5rem;
	line-height: 2rem;
	resize: none;
	${flexChildrenStyles}
	height: 5rem;
	padding: 1rem;
`;
