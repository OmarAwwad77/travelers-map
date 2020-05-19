import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import SelectRaw from 'react-select';

import { GridCss } from './form.types';

type TitleProps = {
	gridArea?: FlattenSimpleInterpolation;
	fontSize?: string;
	// noMarginBottom?: boolean;
};

export const Title = styled.h2<TitleProps>`
	align-self: start;
	font-size: ${(p) => (p.fontSize ? p.fontSize : '2rem')};
	margin: 0;
	${(p) => p.gridArea};
`;

export const Divider = styled.div`
	margin-bottom: 2rem;
	width: 100%;
	background-color: #c7c7c7;
	height: 0.1rem;
	${(p: { gridArea?: FlattenSimpleInterpolation }) => p.gridArea};
`;

export const SubTitle = styled(Title)`
	font-size: 1.4rem;
	color: #3e3e3e;
`;

export const subTitleGridArea = css`
	grid-area: subTitle;
`;

export const titleGridArea = css`
	grid-area: title;
`;

export const dividerGridArea = css`
	grid-area: divider;
`;

export const FormWrapper = styled.form`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: auto;
	grid-auto-rows: auto;
	font-size: 1.4rem;
	${(p: { css: GridCss }) => p.css}
`;

export const Label = styled.label`
	grid-area: ${(p: { gridArea: string }) => p.gridArea};
	color: #3e3e3e;
	text-transform: capitalize;
`;

export const Required = styled.abbr.attrs((p) => ({
	title: 'required',
}))`
	cursor: help;
	margin-left: 0.6rem;
`;

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	grid-area: ${(p: { gridArea: string }) => p.gridArea};
`;

export const Input = styled.input`
	position: relative;
	outline: none;
	padding: 1rem;
	border: 1px solid #cac1c187;
	font-size: inherit;
	font-family: inherit;
	transition: all 0.2s ease-out;
	background: transparent;

	&:focus,
	&:hover {
		border-color: #9c9999;
	}
`;

export const InputError = styled.span`
	height: 1rem;
	color: red;
	font-size: 1rem;
	text-transform: capitalize;
`;

export const Select = styled(SelectRaw)`
	grid-area: ${(p: { gridArea: string }) => p.gridArea};

	.react-select__control {
		border-radius: 0;
		border-color: #cac1c187;
		height: 5rem;
		box-shadow: none;
		margin-bottom: 1rem;

		&--is-focused,
		&:hover {
			border-color: #9c9999;
			outline: none;
			cursor: pointer;
		}
	}

	.react-select__value {
		outline: none;
	}

	.react-select__option:hover {
		cursor: pointer;
	}
`;
