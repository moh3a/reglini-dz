import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { providers, getSession, csrfToken, useSession } from "next-auth/client";

import LoginSocialMedia from "../../components/auth/LoginSocialMedia";
import Register from "../../components/auth/Register";

const RegisterScreen = ({ providers, csrfToken, children }: any) => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  return (
    <>
      <Head>
        <title>Create new account | reglini.dz</title>
        <meta
          name="description"
          content="Join us and enjoy our services from easily shopping from Aliexpress in Algerian dinars to creating personnalized facebook ads."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
      {!loading && !session && (
        <section className="flex flex-col items-center lg:my-8 sm:my-4 md:flex-row">
          <div className="container mx-auto">
            <div className="flex justify-center px-2 py-6 ">
              <div className="flex w-full rounded-lg xl:w-3/4 lg:w-11/12 lg:shadow-xl ">
                <div className="relative hidden w-full h-auto bg-white bg-cover dark:bg-grim border-r rounded-l-lg lg:block lg:w-6/12">
                  <div className="relative z-0 m-12 text-left ">
                    {/* <a className="flex items-center w-32 mb-4 font-medium text-blueGray-900 title-font md:mb-10">
                  <h2 className="text-lg font-bold tracking-tighter text-gray-800 dark:text-gray-100 transition duration-500 ease-in-out transform hover:text-lightBlack-500 dark:text-lightBlue-400">
                    {" "}
                    reglini.dz{" "}
                  </h2>
                </a> */}
                    <h2 className="mt-12 mb-2 text-2xl font-semibold tracking-tighter text-gray-800 dark:text-gray-100 sm:text-3xl title-font">
                      {" "}
                      Create an account.{" "}
                    </h2>
                    <div className="w-full mt-16 mb-8 text-base leading-relaxed text-blueGray-900 sm:md:w-3/3 lg:text-1xl ">
                      {" "}
                      All you have to do is choose the section you need, remove
                      the one that you do not need for that project and paste
                      the one you need in that moment. All the section have been
                      given the same left/right padding. Because consistence is
                      king.{" "}
                    </div>
                  </div>
                </div>
                <div className="w-full px-8 py-24 bg-white dark:bg-grim rounded-lg border-gray-800 lg:w-8/12 lg:px-24 lg:py-4 lg:rounded-l-none s">
                  <div className="relative z-0 text-left ">
                    <h1 className="lg:hidden text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">
                      Sign Up
                    </h1>
                    <LoginSocialMedia providers={providers} />
                    <Register csrfToken={csrfToken} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

RegisterScreen.getInitialProps = async (context: any) => {
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
    messages: require(`../../locales/${locale}.json`),
  };
};

import Layout from "../../components/layout/Layout";
RegisterScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default RegisterScreen;
