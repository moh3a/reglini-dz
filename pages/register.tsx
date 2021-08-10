import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

import { selectUser } from "../utils/redux/userSlice";
import { register } from "../utils/redux/authAsyncActions";
import styles from "../styles/screens/RegisterScreen.module.scss";

const RegisterScreen = ({}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, status } = useSelector(selectUser);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

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
      <div onClick={() => router.back()}>Go back.</div>
      <div className={styles.registerscreen}>
        <form className={styles.registerscreenForm} onSubmit={registerHandler}>
          <h3 className={styles.registerscreenTitle}>Register</h3>

          {/* error */}
          {error && <span className={styles.errormessage}> {error} </span>}

          {/* Username */}
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

          {/* Email */}
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

          {/* Password */}
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

          {/* Confirm Password */}
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
      </div>
    </>
  );
};

import Layout from "../components/layout/Layout";
RegisterScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default RegisterScreen;
