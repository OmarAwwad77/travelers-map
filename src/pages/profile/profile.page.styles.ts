import styled, { css, ThemedStyledProps } from 'styled-components';
import MediaQueries, { ThemedProps } from '../../styles/media-queries';

export const Wrapper = styled.section`
	display: flex;
	${MediaQueries.BREAK_POINT_850_PX(css`
		flex-direction: column-reverse;
	`)}
`;

export const TabsWrapper = styled.div`
	/* margin: 0 2rem; */
	max-width: 40rem;
`;

export const SideBarWrapper = styled.div`
	width: 30%;
	min-width: 31rem;
	padding: 5rem 0;

	${MediaQueries.BREAK_POINT_850_PX(css`
		margin: 0 auto;
		width: 50%;
		padding: 0;
	`)}
`;

interface EditLinkProps {
	disabled?: string;
}

export const EditLink = styled.span<EditLinkProps>`
	position: relative;
	text-transform: capitalize;
	cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};

	opacity: ${(p) => p.disabled && 0.4};

	&:not(:last-child) {
		margin-bottom: 4rem;
	}
	&:hover {
		&::after {
			opacity: 1;
			visibility: visible;
		}
		text-decoration: ${(p) => (p.disabled ? 'none' : 'underline')};
	}
	&:last-child {
		color: red;
	}

	${(p) =>
		p.disabled &&
		css`
			&::after {
				content: ${(p: ThemedProps<EditLinkProps>) => "'" + p.disabled + "'"};
				width: 20rem;
				position: absolute;
				top: -100%;
				left: -50%;
				right: -50%;
				transition: all 0.3s ease-out;
				opacity: 0;
				visibility: hidden;
				background: #fff;
				border: 1px solid #b9b4b4;
				font-size: 1.4rem;
				text-align: center;
			}
		`}
`;

export const EditLinksWrapper = styled.div`
	padding: 2rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
