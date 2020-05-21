import styled, { css } from 'styled-components';
import { HeroButton } from '../../components/hero/hero.styles';
export { ErrorMessage } from '../../hoc/with-error/with-error';

export const ChangePasswordWrapper = styled.div`
	padding: 2rem;
	width: 32rem;
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
