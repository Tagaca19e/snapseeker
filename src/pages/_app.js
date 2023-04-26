import AppContext from '@/components/AppContextProvider';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import NextNprogress from 'nextjs-progressbar';

export default function App({ Component, pageProps }) {
  return (
    <AppContext>
      <NextNprogress color="#3bb77e" />
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />{' '}
      </SessionProvider>{' '}
    </AppContext>
  );
}
