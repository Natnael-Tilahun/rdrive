import { Provider } from 'react-redux'
import {store} from '../redux/store'
import '../styles/globals.css'
import '../styles/markdown-github.css'
import 'react-tippy/dist/tippy.css';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google'
const font = Inter({subsets: ['latin']})

import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { appWithTranslation } from 'next-i18next'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextUIProvider>
      <ThemeProvider attribute="class">
        <main className={font.className}>
          <NextNProgress color="#A020F0" startPosition={0.1} stopDelayMs={200} height={3} showOnShallow={true} options={{ showSpinner: false }} />
          <Component {...pageProps} />
          <Analytics />
        </main>
      </ThemeProvider>
      </NextUIProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp)