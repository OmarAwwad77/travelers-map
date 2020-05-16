import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			main: string;
			mainDarker: string;
			secondary1: string;
			secondary2: string;
			text: string;
		};
	}
}
