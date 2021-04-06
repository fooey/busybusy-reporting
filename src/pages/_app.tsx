import type { AppProps /*, AppContext */ } from 'next/app';
import Head from 'next/head';
import HeadScripts from '~/components/layout/scripts/HeadExternalScripts';
import BodyScripts from '~/components/layout/scripts/BodyExternalScripts';
import AppFooter from '~/components/layout/AppFooter';
import AppHeader from '~/components/layout/AppHeader';
import '~/styles/tailwind.css';

const includeScripts = process.env.NODE_ENV === 'production';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#fcbf12" />

        {includeScripts && <HeadScripts />}
      </Head>

      <AppHeader />

      <main className="container mx-auto my-8 px-4">
        <Component {...pageProps} />
      </main>

      <AppFooter />

      {includeScripts && <BodyScripts />}
    </>
  );
}

//5mwUL8M9RJKVI9f2Ooj_Cg

export default MyApp;
