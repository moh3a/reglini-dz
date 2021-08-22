import { useRouter } from "next/router";
import { providers, getSession, csrfToken } from "next-auth/client";
import { useEffect, useState } from "react";
import LoginScreen from ".";
import Banner from "../../components/Banner";

const LoginError = ({ csrfToken, providers }: any) => {
  const router = useRouter();
  const { message } = router.query;
  const [error, setError] = useState("");

  useEffect(() => {
    if (message === "invalid_credentials") {
      setError("The credentials you have enterend are invalid.");
    } else if (message === "user_not_found") {
      setError(
        "No user was found, please register following <Link href='/register'>this link<Link>."
      );
    } else if (message === "login_to_view_wishlist") {
      setError("You have to be logged in to view or edit your wishlist.");
    } else {
      router.push("/login");
    }
  }, [message, router]);

  return (
    <>
      <LoginScreen providers={providers} csrfToken={csrfToken}>
        {error && <Banner type="error">{error}</Banner>}
      </LoginScreen>
    </>
  );
};

LoginError.getInitialProps = async (context: any) => {
  const { req, res } = context;
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
  };
};

import Layout from "../../components/layout/Layout";
LoginError.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default LoginError;
