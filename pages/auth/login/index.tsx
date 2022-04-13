import { ReactNode, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  providers,
  getSession,
  csrfToken,
  useSession,
  SessionProviderOptions,
  ClientSafeProvider,
} from "next-auth/client";

import Login from "../../../components/auth/Login";
import LoginSocialMedia from "../../../components/auth/LoginSocialMedia";

const LoginScreen = ({
  providers,
  csrfToken,
  children,
}: {
  providers: SessionProviderOptions;
  csrfToken: ClientSafeProvider;
  children: ReactNode;
}) => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  return (
    <>
      <Head>
        <title>Login | reglini-dz</title>
        <meta
          name="description"
          content="Join us and enjoy our services from easily shopping from Aliexpress in Algerian dinars to creating personnalized facebook ads."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}

      {!loading && !session && (
        <section className="flex flex-col items-center lg:my-8 sm:my-4 md:flex-row ">
          <div className="container mx-auto ">
            <div className="flex justify-center px-2 py-6 ">
              <div className="w-full max-w-sm px-8 py-24 bg-gray-50 dark:bg-grim rounded-lg lg:shadow-xl ">
                <div className="relative z-0 text-left ">
                  <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">
                    Sign In
                  </h1>
                  <Login csrfToken={csrfToken} />
                  <div className="flex items-center justify-between my-4">
                    <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
                    <div className="text-xs text-center cursor-pointer text-gray-500 uppercase dark:text-gray-400 hover:underline">
                      or login with Social Media
                    </div>
                    <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                  </div>
                  <LoginSocialMedia providers={providers} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

LoginScreen.getInitialProps = async (context: any) => {
  const { req, res, locale } = context;
  const session = await getSession({ req });
  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }
  return {
    session: undefined,
    providers: await providers(),
    csrfToken: await csrfToken(context),
    messages: require(`../../../locales/${locale}.json`),
  };
};

import Layout from "../../../components/layout/Layout";
LoginScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default LoginScreen;
