import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';
import Login from 'components/Login';
import { useAppContext } from 'lib/context';

export default function Home(): JSX.Element {
  const { state } = useAppContext();
  return (
    <>
      <Head>
        <title>HOME PAGE</title>
        <meta name="description" content="blabalbalb" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container">
          <h1>THIS IS HOMEAPGE</h1>
          <div className="mb-5">
            <Link href="/private-area">
              <a>go to private area</a>
            </Link>
          </div>
          {state?.auth && (
            <div>
              <h1>Hello {state.auth.firstName}</h1>
            </div>
          )}
          {!state?.auth && <Login />}
        </div>
      </Layout>
    </>
  );
}
