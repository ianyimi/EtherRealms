import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {

  const AUTHOR = "Isaiah Anyimi",
    TITLE = "Zay's World";

  return (
    <>
      <Head>
        {/* Basic Info*/}
        <meta charSet="utf-8" />
        <meta name="language" content="english" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="content-type" content="text/html" />
        <title>{TITLE}</title>

        {/* SEO tags */}
        <meta name="author" content={AUTHOR} />
        <meta name="designer" content={AUTHOR} />
        <meta name="publisher" content={AUTHOR} />
        <meta
          name="description"
          content="A Virtual Portfolio built with spacesvr."
        />
        <meta name="keywords" content="Anyimi" />
        <meta name="distribution" content="web" />

        {/* open graph */}
        {/*<meta property="og:url" content="https://universe.muse.place" />*/}
        {/*<meta property="og:type" content="website" />*/}
        {/*<meta*/}
        {/*  property="og:title"*/}
        {/*  content="Muse | Instantly build and deploy your own World"*/}
        {/*/>*/}
        {/*<meta*/}
        {/*  property="og:description"*/}
        {/*  content="Use our advanced customization features to add in 2D and 3D assets into your world."*/}
        {/*/>*/}
        {/*<meta property="og:image" content="icons/icon-512x512.png" />*/}

        {/* pwa */}
        {/*<link rel="manifest" href="/manifest.json" />*/}

        {/* icons */}
        {/*<link*/}
        {/*  rel="apple-touch-icon"*/}
        {/*  sizes="180x180"*/}
        {/*  href="/apple-touch-icon.png"*/}
        {/*/>*/}
        {/*<link*/}
        {/*  rel="icon"*/}
        {/*  type="image/png"*/}
        {/*  sizes="32x32"*/}
        {/*  href="icons/icon-32x32.png"*/}
        {/*/>*/}
        {/*<link*/}
        {/*  rel="icon"*/}
        {/*  type="image/png"*/}
        {/*  sizes="16x16"*/}
        {/*  href="icons/icon-16x16.png"*/}
        {/*/>*/}
        {/*<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#808080" />*/}
        <meta name="msapplication-TileColor" content="#ffffff" />

        {/* mobile */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <meta name="theme-color" content="#ffffff" />

        {/* twitter */}
        {/*<meta name="twitter:card" content="Muse" />*/}
        {/*<meta name="twitter:site" content="@musehq_" />*/}
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
