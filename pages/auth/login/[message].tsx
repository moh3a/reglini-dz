import { useRouter } from "next/router";
import { providers, getSession, csrfToken } from "next-auth/client";
import { useEffect, useState } from "react";
import LoginScreen from ".";
import AlertMessage from "../../../components/elements/AlertMessage";
import { LoginErrorMessages } from "../../../data/LoginMessages";

const LoginError = ({ csrfToken, providers }: any) => {
  const router = useRouter();
  const { message } = router.query;
  const [error, setError] = useState("");

  useEffect(() => {
    LoginErrorMessages.map((msg) => {
      if (message === msg.name) {
        setError(msg.text);
      }
    });
  }, [message]);

  return (
    <>
      <LoginScreen providers={providers} csrfToken={csrfToken}>
        {error && <AlertMessage type="error" message={error} />}
      </LoginScreen>
    </>
  );
};

LoginError.getInitialProps = async (context: any) => {
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
LoginError.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default LoginError;
