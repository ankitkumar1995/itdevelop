import '../styles/globals.scss';
import '../styles/antd-altered.css';
// import "../styles/all.sass"
// import "../styles/all.scss"
import 'react-modal-video/scss/modal-video.scss';
import '../styles/fontawesome.css';
import '../styles/nice-select.css';
import '../styles/homeHeader.css';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { Provider } from 'next-auth/client';
import '../styles/customantd.css';
import AppContext from '../AppContext';
import { initializeApollo } from '../lib/apollo';
import {
  FooterQuery,
  FooterQueryKN,
  HeaderQuery,
  HeaderQueryKN,
  MegaMenuQuery,
} from '../lib/LayoutQuery';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import { createBrowserHistory } from 'history';
function MyApp({
  Component,
  pageProps,
  footerData,
  footerDataKN,
  headerData,
  headerDataKN,
  megaMenuData,
}) {
  const router = useRouter();
  useEffect(() => storePathValues, [router.asPath]);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem('currentPath');
    storage.setItem('prevPath', prevPath ? prevPath : 'en');
    // Set the current path value by looking at the browser's location object.
    storage.setItem('currentPath', globalThis.location.search);
  }
  return (
    <>
      <AppContext.Provider
        value={{
          state: {
            footerData,
            footerDataKN,
            headerData,
            headerDataKN,
            megaMenuData,
          },
        }}
      >
        <Provider session={pageProps?.session}>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      </AppContext.Provider>
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async () => {
  const apolloClient = initializeApollo();
  const footerData = await apolloClient.query({
    query: FooterQuery,
  });
  const footerDataKN = await apolloClient.query({
    query: FooterQueryKN,
  });
  const headerData = await apolloClient.query({
    query: HeaderQuery,
  });
  const headerDataKN = await apolloClient.query({
    query: HeaderQueryKN,
  });
  const megaMenuData = await apolloClient.query({
    query: MegaMenuQuery,
  });
  return {
    footerData,
    footerDataKN,
    headerData,
    headerDataKN,
    megaMenuData,
  };
};
