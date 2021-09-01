import { NextPage } from "next";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider } from "next-auth/client";
import { Provider as ReduxProvider } from "react-redux";
import { NextIntlProvider } from "next-intl";

import "../styles/globals.css";
import { useStore } from "../utils/redux/store";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState);
  // GET LAYOUT FOR SINGLE PAGE APP BEHAVIOUR
  const getLayout = (Component as any).getLayout || ((page: NextPage) => page);

  return (
    <>
      <Head>
        <title>reglini.dz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="facebook-domain-verification"
          content="tqch8yg7c5a548rbwp8vepozlepnap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Provider session={pageProps.session}>
        <ThemeProvider attribute="class">
          <NextIntlProvider messages={pageProps.messages}>
            <ReduxProvider store={store}>
              {getLayout(<Component {...pageProps} />)}
            </ReduxProvider>
          </NextIntlProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default MyApp;
