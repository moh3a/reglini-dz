import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  providers,
  signIn,
  getSession,
  csrfToken,
  useSession,
} from "next-auth/client";

import styles from "../styles/screens/LoginScreen.module.scss";

const LoginScreen = ({ providers, csrfToken }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, loading] = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  // const { isAuthenticated, status, error } = useSelector(selectAuth);
  // const loginHandler = async (e: any) => {
  //   e.preventDefault();
  //   const user = { email, password };
  //   dispatch(login(user));
  // };

  return (
    <div>
      <div>
        <Link href="/">
          <a>Go back home.</a>
        </Link>
      </div>

      <div className={styles.loginscreen}>
        {/* <form className={styles.loginscreenForm} onSubmit={loginHandler}>
          <h3 className={styles.loginscreenTitle}>Login</h3> */}

        {/* error */}
        {/* {error && <span className={styles.errormessage}> {error} </span>} */}

        {/* Email */}
        {/* <div className={styles.formgroup}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              required
              id="email"
              placeholder="Enter an email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              tabIndex={1}
              autoComplete="off"
            />
          </div> */}

        {/* Password */}
        {/* <div className={styles.formgroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              required
              id="password"
              placeholder="Enter a password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              tabIndex={2}
              autoComplete="off"
            />
            <span className={styles.loginscreenForgotpassword}>
              <Link href="/forgotpassword">
                <a tabIndex={4}>Forgot password?</a>
              </Link>
            </span>
            <span className={styles.loginscreenSubtext}>
              Don&apos;t have an account? <Link href="/register">Register</Link>
              .
            </span>
          </div> */}

        {/* <div className={styles.btn}>
            <button type="submit" tabIndex={3}>
              Login
            </button>
          </div>
        </form> */}

        <form method="POST" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label htmlFor="email">
            Email Address:
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Sign in</button>
        </form>

        <div className={styles.providers}>
          {Object.values(providers).map((provider: any) => {
            if (provider.name === "credentials") return; // the credentials form is already added above
            return (
              <div key={provider.name} className={styles.providersbtn}>
                <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
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
