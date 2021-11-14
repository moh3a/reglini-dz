import { NextPage } from "next";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Provider as NextAuthProvider } from "next-auth/client";
import { Provider as ReduxProvider } from "react-redux";
import { NextIntlProvider } from "next-intl";

import "../styles/globals.css";
import { useStore } from "../utils/redux/store";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const store = useStore(pageProps.initialReduxState);
  const getLayout = (Component as any).getLayout || ((page: NextPage) => page);

  return (
    <>
      <Head>
        <title>reglini.dz</title>
        <meta
          name="description"
          content="Welcome to reglini.dz, where you'll be able to buy items from Aliexpress using the local algerian dinars or subscribe to the provided services."
        />
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
        <link rel="alternate" hrefLang="en" href="https://reglini-dz.com/en" />
        <link rel="alternate" hrefLang="fr" href="https://reglini-dz.com/fr" />
        <link rel="alternate" hrefLang="ar" href="https://reglini-dz.com/ar" />
      </Head>
      <NextAuthProvider session={pageProps.session}>
        <ThemeProvider attribute="class">
          <NextIntlProvider messages={pageProps.messages}>
            <ReduxProvider store={store}>
              {getLayout(<Component {...pageProps} />)}
            </ReduxProvider>
          </NextIntlProvider>
        </ThemeProvider>
      </NextAuthProvider>
    </>
  );
};

export default MyApp;
