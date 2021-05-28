import Document, {
	DocumentContext,
	Html,
	Head,
	Main,
	NextScript
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		const pageProps = this.props.__NEXT_DATA__.props;

		let preferredTheme;
		if (pageProps) {
			({ preferredTheme } = pageProps);
		}

		return (
			<Html lang="en" dir="ltr">
				<Head>
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap"
						media="print"
					/>
				</Head>
				<body className={preferredTheme}>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
