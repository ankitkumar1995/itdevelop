import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(createTheme());

class MyDocument extends Document {
  render() {
    return (
      <Html lang="eng">
        <Head>
          <meta
            property="og:title"
            content="Mission Startup Karnataka"
            key="title"
          />
          <meta name="Startup Karnataka" content="karnataka startup" />
          <link
            rel="preconnect"
            crossOrigin="true"
            href="https://fonts.googleapis.com/"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          ></link>
          <link href="../styles/all.css" rel="stylsheet"></link>
          <link href="../styles/css/all.css" rel="stylsheet"></link>
          <link
            rel="shortcut icon"
            href="/assets/img/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <link rel="icon" href="/assets/img/favicon.ico" type="image/x-icon" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          ></link>

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-YC1ZP5LJ65`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YC1ZP5LJ65', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

          <script
            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
            integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.min.js"
            integrity="sha384-lpyLfhYuitXl2zRZ5Bn2fqnhNAKOAaM/0Kr9laMspuaMiZfGmfwRNFh8HlMy49eQ"
            crossOrigin="anonymous"
          ></script>
          <script src="/fontawesomekit.js"></script>

          {/* login script  */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){
            sih_auth_api_key = "KA7tVfzjBQj9A3n2";
            sih_auth_callback_uri = "https://www.missionstartupkarnataka.org/startupindia";
                })(window);`,
            }}
          />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script
            type="text/javascript"
            src="https://www.startupindia.gov.in/etc/designs/invest-india/investindialibs/js/siauthlogin.js"
          ></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `(function(d){var s = d.createElement("script");s.setAttribute("data-account", "86qOJdWqVE");s.setAttribute("src", "https://cdn.userway.org/widget.js");(d.body || d.head).appendChild(s)})(document);`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root"></div>
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

export default MyDocument;
