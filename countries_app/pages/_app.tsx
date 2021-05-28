import { createGlobalStyle } from 'styled-components';
import { ThemeProvider, getThemePreference } from '../context/use-theme';
import type { AppProps, AppContext } from 'next/app';
import type { ThemeType } from '../lib/types';
import '@fortawesome/fontawesome-svg-core/styles.css';

// light theme variables
const lightVars = `
  --bg: var(--veryLightGray);
  --textColor: var(--veryDarkBlue2);
  --elementColor: var(--white);
  --inputColor: var(--darkGray);
  font-size: 62.5%;
  color: var(--textColor);
`;

// dark theme variables
const darkVars = `
  --bg: var(--veryDarkBlue1); 
  --textColor: var(--white);
  --elementColor: var(--darkBlue);
  --inputColor: var(--darkBlue);
  font-size: 62.5%;
  color: var(--textColor);
 `;

const themeVars = `
  // default to dark if refers-color-scheme is not supported
  :root {

    ${darkVars}
  }

  @media (prefers-color-scheme: light) {
    :root {

      ${lightVars}
    }
    .dark {

      ${darkVars}
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {  

      ${darkVars}
    }

    .light {

      ${lightVars}
    }
  }

  @media (prefers-color-scheme: no-preference) {}

}

  
`;

const GlobalStyles = createGlobalStyle`
${themeVars}
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}




/* GLOBAL STYLES */
:root {
  --textFont1: 1.4rem;
  --textFont2: 1.6rem;

  --white: hsl(0, 0%, 100%);

  --darkBlue: hsl(209, 23%, 22%);
  --veryDarkBlue1: hsl(207, 26%, 17%);
  --veryDarkBlue2: hsl(200, 15%, 8%);

  --veryLightGray: hsl(0, 0%, 98%);
  --darkGray: hsl(0, 0%, 52%);

  --desktopWidth: 1440px;
  --mobileWidth: 375px;

  --fontWeightLight: 300;
  --fontWeightNormal: 600;
  --fontWeightBold: 800;

  --boxShadow1:rgba(0, 0, 0, 0.1) 0px 4px 12px;

  font-size: 62.5%;
  color: var(--textColor);
  background-color: var(--bg);
  height: 100%;

}

*,
*:before,
*:after {
  box-sizing: border-box;
  line-height: 1.5;
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;

}

#__next {
  /*
    Create a stacking context, without a z-index.
    This ensures that all portal content (modals and tooltips) will
    float above the app.
  */
  isolation: isolate;
}

html, body, #__next {
  height: 100%;
}


`;

interface IMyAppProps extends AppProps {
	preferredTheme: string;
}

// type predicate for checking preferred theme
function isThemeType(
	preferredTheme: ThemeType | string
): preferredTheme is ThemeType {
	return preferredTheme === 'dark' || preferredTheme === 'light';
}

function MyApp({ Component, pageProps, preferredTheme }: IMyAppProps) {
	// check if preferred theme is correct type if not default to dark
	const theme = isThemeType(preferredTheme) ? preferredTheme : 'dark';

	return (
		<>
			<GlobalStyles />
			<ThemeProvider preferredTheme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
	let pageProps = {};
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	const preferredTheme = getThemePreference(ctx);

	return { pageProps, preferredTheme };
};

export default MyApp;
