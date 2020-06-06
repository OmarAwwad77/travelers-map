import styled, { css } from 'styled-components';
import { HeroButton } from '../../components/hero/hero.styles';
export { ErrorMessage } from '../../hoc/with-error/with-error';

export const Wrapper = styled.div`
	padding: 2rem;
	min-width: 28rem;
	max-width: 33rem;
`;

export const UpdateButton = styled(HeroButton)<{ disabled?: boolean }>`
	width: 100%;
	border-radius: 1rem;
	opacity: ${(p) => p.disabled && 0.4};
	pointer-events: ${(p) => p.disabled && 'none'};
`;

export const gridCss = css`
	gap: 1rem;
	grid-template-areas:
		'title title'
		'oldPasswordLabel oldPasswordLabel'
		'oldPassword oldPassword'
		'newPasswordLabel newPasswordLabel'
		'newPassword newPassword';
`;

export const Confirm = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ConfirmationMessage = styled.span`
	font-size: 1.8rem;
	text-transform: capitalize;
`;

export const ButtonsWrapper = styled.div`
	margin-top: 3rem;
	width: 100%;
	display: flex;
	justify-content: space-evenly;
`;
export const Cancel = styled.button`
	outline: none;
	border: none;
	border-radius: 1rem;
	padding: 1rem 2.5rem;
	color: #fff;
	background: ${(p) => p.theme.colors.secondary2};
`;

export const Proceed = styled(Cancel)`
	background: red;
`;
