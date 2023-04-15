import React from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import Head from 'next/head';

const Layout = ({
  children,
  handleChange,
  handleLoad,
  path,
  pageTitle,
  metaDescription,
}) => {
  return (
    <div>
      <Head>
        <title>{pageTitle ? pageTitle : 'Startup Karnataka'}</title>
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=utf-8"
        ></meta>
        <meta name="description" content={metaDescription}></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta http-equiv="X-Frame-Options" content="deny"></meta>
      </Head>
      <Header handleChange={handleChange} onLoad={handleLoad} path={path} />
      {children}
      <Footer handleChange={handleChange} path={path} />
    </div>
  );
};
export default React.memo(Layout);
