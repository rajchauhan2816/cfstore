import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from '../contexts/app/AppContext';
import { GlobalStyles } from '../utils/globalStyles';
import { theme } from '../utils/theme';
import { Provider } from "react-redux";
import { store } from "../store";
import AuthProvider from '@/components/AuthProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Topbar from '@/components/topbar/Topbar';
import PincodeProvider from '@/components/PincodeProvider';
import ChannelProvider from '@/components/ChannelProvider';
import CartProvider from '@/components/CartProvider';
import App from "next/app"

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

NProgress.configure({ showSpinner: false });

interface AppParams {
  Component: any
  pageProps: any
  query: {
    channel: string
    affiliateId: string
    resellerId: string
  }
  pathname: string
}

const MyApp = ({ Component, pageProps, query, pathname }: AppParams) => {
  let Layout = Component.layout || Fragment;

  let persistor = persistStore(store);



  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          property="og:url"
          content="https://bonik-react.vercel.app/landing"
        />
        {/* thumbnail And title for social media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="React Next JS Ecommerce Template" />
        <meta
          property="og:description"
          content="Minimal, clean and Fast Next js ecommerce template. Build Super store, Grocery delivery app, Multivendor store and niche market"
        />
        <meta
          property="og:image"
          content="/assets/images/landing/preview.png"
        />

        {/* Google analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SGG7GE7HZC"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SGG7GE7HZC');
          `,
          }}
        ></script>
      </Head>
      <GlobalStyles />
      <AppProvider>
        {pathname != "/404" ? <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ChannelProvider {...query}>
              <PincodeProvider>
                <AuthProvider>
                  <CartProvider>
                    <Topbar />
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </CartProvider>
                </AuthProvider>
              </PincodeProvider>
            </ChannelProvider>
          </PersistGate>
        </Provider> : <Component {...pageProps} />}
      </AppProvider>
    </ThemeProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const { query, pathname } = appContext.ctx
  return { query, pathname, ...appProps }
}


export default MyApp;
