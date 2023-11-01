import { Provider } from 'react-redux'
import {store} from '../redux/store'
import '../styles/globals.css'
import '../styles/github-markdown.css'
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
          <NextNProgress color="#228B22" height={4} options={{ showSpinner: false }}/>
          <Component {...pageProps} />
          <Analytics />
        </main>
      </ThemeProvider>
      </NextUIProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp)