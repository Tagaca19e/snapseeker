import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import AppContext from '@/components/AppContextProvider';

export default function App({ Component, pageProps }) {
  return (
    <AppContext>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />{' '}
      </SessionProvider>{' '}
    </AppContext>
  );
}
