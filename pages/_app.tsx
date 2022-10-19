import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { AppWrapper } from 'lib/context';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="lang" content="it" />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-italia@2.0.4/dist/css/bootstrap-italia.min.css"
        />
      </Head>
      <Script
        strategy="beforeInteractive"
        src="https://cdn.jsdelivr.net/npm/bootstrap-italia@2.0.4/dist/js/bootstrap-italia.bundle.min.js"
      />
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  );
}
