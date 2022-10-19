import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import { useAppContext, ActionTypes } from 'lib/context';

export default function Home(): JSX.Element {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (!state || !state.auth) {
      setTimeout(() => {
        router.push(`/`);
      }, 100);
    }
  }, []);

  function logout() {
    dispatch({ type: ActionTypes.RESET, data: null });
    router.push(`/`);
  }
  return (
    <>
      <Head>
        <title>PRIVATE AREA</title>
        <meta name="description" content="blabalbalb" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container">
          <Link href="/">
            <a>back to Home</a>
          </Link>
          <h1>Private Area</h1>
          {state?.auth ? (
            <div>
              <h1>Hello {state.auth.firstName}</h1>
              <button onClick={() => logout()}>Logout</button>
            </div>
          ) : (
            <div>
              <h1 className="text-danger">You Are not Authorized</h1>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
