import { Provider } from 'react-redux'
import {store} from '../redux/store'
import '../styles/globals.css'
import '../styles/github-markdown.css'
import { Analytics } from '@vercel/analytics/react';
import { useRouter } from 'next/navigation';

import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { appWithTranslation } from 'next-i18next'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes';
import Layout from '../app/layout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <NextUIProvider navigate={router.push}>
          <NextNProgress color="#228B22" height={4} options={{ showSpinner: false }}/>
          <Layout>
          <Component {...pageProps} />
          </Layout>
          <Analytics />
      </NextUIProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp)

