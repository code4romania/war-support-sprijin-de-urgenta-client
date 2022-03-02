/* eslint-disable @next/next/google-font-display */
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;700&display=swap"
            rel="stylesheet"
          />

          <meta
            name="description"
            content="Sprijin de urgență."
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />

          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="icon" href="/favicon/favicon.ico" />

          <meta
            property="og:image"
            content="TBD"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="TBD" />
          <meta property="og:site_name" content="TBD" />
          <meta property="og:title" content="TBD" />
          <meta
            property="og:description"
            content="Sprijin de urgență"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
