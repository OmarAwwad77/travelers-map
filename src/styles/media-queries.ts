import {
	FlattenInterpolation,
	css,
	ThemeProps,
	DefaultTheme,
	ThemedStyledProps,
} from 'styled-components';

import theme from '../styles/theme';

export type ThemedProps<P> = ThemedStyledProps<P, typeof theme>;
type Css = FlattenInterpolation<ThemeProps<DefaultTheme>>;
type MediaQueryFun = (css: FlattenInterpolation<any>) => Css;
type BreakPoints = keyof typeof breakPoints;
type MediaQueries = {
	[key in BreakPoints]: MediaQueryFun;
};

// 430

const breakPoints = {
	BREAK_POINT_430_PX: '430px',
	BREAK_POINT_500_PX: '500px',
	BREAK_POINT_600_PX: '600px',
	BREAK_POINT_850_PX: '850px',
	BREAK_POINT_950_PX: '950PX',
	BREAK_POINT_1060_PX: '1060PX',
};

const breakPointKeys = Object.keys(breakPoints) as BreakPoints[];

export default breakPointKeys.reduce((acc, key) => {
	acc[key] = (style) => css`
		@media only screen and (max-width: ${breakPoints[key]}) {
			${style};
		}
	`;
	return acc;
}, {} as MediaQueries);
