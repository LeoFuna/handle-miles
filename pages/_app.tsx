import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import UserContext from 'context/GeneralContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <UserContext>
        <Component {...pageProps} />
      </UserContext>
    </SessionProvider>
  );
}

export default MyApp;
