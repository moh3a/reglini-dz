import { useState } from "react";
import { useDispatch } from "react-redux";
import { providers, getSession, csrfToken } from "next-auth/client";
import { useRouter } from "next/router";

import { register } from "../utils/redux/authAsyncActions";
import LoginSocialMedia from "../components/auth/LoginSocialMedia";
import Register from "../components/auth/Register";

const RegisterScreen = ({ providers, csrfToken }: any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  // const { isAuthenticated, status } = useSelector(selectUser);
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push("/");
  //   }
  // }, [isAuthenticated, router]);

  const registerHandler = (e: any) => {
    e.preventDefault();
    // CONFIRM IF TWO PASSWORDS MATCH
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match!");
    }
    // NEW USER WITH ENTERED CREDENTIALS
    const user = { username, email, password };
    dispatch(register(user));
  };

  return (
    <>
      {/* <div onClick={() => router.back()}>Go back.</div>
      <div className={styles.registerscreen}>
        <form className={styles.registerscreenForm} onSubmit={registerHandler}>
          <h3 className={styles.registerscreenTitle}>Register</h3>

          {error && <span className={styles.errormessage}> {error} </span>}

          <div className={styles.formgroup}>
            <label htmlFor="name">Username: </label>
            <input
              type="text"
              required
              autoComplete="off"
              id="name"
              placeholder="Enter a username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={styles.formgroup}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              autoComplete="off"
              required
              id="email"
              placeholder="Enter an email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className={styles.registerscreenSubtext}>
              Already have an account? <Link href="/login"> Login </Link>
            </span>
          </div>

          <div className={styles.formgroup}>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              autoComplete="off"
              required
              id="password"
              placeholder="Enter a password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.formgroup}>
            <label htmlFor="confirmpassword">Confirm password : </label>
            <input
              type="password"
              required
              autoComplete="off"
              id="confirmpassword"
              placeholder="Confirm your password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className={styles.btn}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div> */}
      <section className="flex flex-col items-center my-8 md:flex-row">
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
                    the one that you do not need for that project and paste the
                    one you need in that moment. All the section have been given
                    the same left/right padding. Because consistence is king.{" "}
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
    </>
  );
};

RegisterScreen.getInitialProps = async (context: any) => {
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

import Layout from "../components/layout/Layout";
RegisterScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default RegisterScreen;
