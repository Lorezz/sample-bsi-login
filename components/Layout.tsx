import Header from './Header';
import Footer from './Footer';
import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren): JSX.Element {
  return (
    <>
      <Header />
      <div className="container my-4">{children}</div>
      <Footer />
    </>
  );
}
