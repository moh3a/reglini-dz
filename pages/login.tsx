import { useEffect } from "react";
import { useRouter } from "next/router";
import { providers, getSession, csrfToken, useSession } from "next-auth/client";

import Login from "../components/auth/Login";
import LoginSocialMedia from "../components/auth/LoginSocialMedia";

const LoginScreen = ({ providers, csrfToken }: any) => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/");
  }, [session, router]);

  return (
    <>
      {!loading && !session && (
        <section className="flex flex-col items-center my-8 md:flex-row">
          <div className="container mx-auto">
            <div className="flex justify-center px-2 py-6 ">
              <div className="w-full max-w-sm px-8 py-24 bg-white dark:bg-grim rounded-lg border-gray-800  lg:rounded-l-none s lg:shadow-xl">
                <div className="relative z-10 text-left ">
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
  const { req, res } = context;
  // check if user is logged in and not call everytime
  const session = await getSession({ req });
  // if there s already a session there take back to home page and no need to be in signin page
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
  };
};

import Layout from "../components/layout/Layout";
LoginScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default LoginScreen;
