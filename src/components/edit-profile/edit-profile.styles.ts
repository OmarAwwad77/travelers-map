import styled from 'styled-components';
import { UpdateButton as Button } from '../change-password/change-password.styles';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	min-height: 45rem;
	min-width: 28rem;
`;

export const DisplayNameWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 10rem;
	justify-content: space-evenly;
`;

export const DisplayName = styled.input`
	outline: none;
	border: 1px solid #ddd;
	padding: 0.5rem 1rem;
	margin-left: 0.5rem;
	font-family: inherit;
	font-size: inherit;
	&:hover,
	&:active {
		border-color: #aaa;
	}
`;

export const UpdateButton = styled(Button)`
	width: 20rem;
`;
