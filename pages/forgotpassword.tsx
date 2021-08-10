import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import styles from "../styles/screens/LoginScreen.module.scss";

const ForgotPasswordScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e: any) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <div onClick={() => router.back()}>Go back.</div>
      <div className={styles.fpscreen}>
        <form className={styles.fpscreenForm} onSubmit={forgotPasswordHandler}>
          <h3 className={styles.fpscreenTitle}>Set New Password</h3>

          {/* error */}
          {error && <span className={styles.errorMessage}> {error} </span>}

          {/* success */}
          {success && <span className={styles.successMssage}> {success} </span>}

          {/* Email */}
          <div className={styles.formGroup}>
            <p className={styles.fpscreenSubtext}>
              Please enter the email address you registered your account with.
              We will send you a reset password confirmation to this email.
            </p>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.btn}>
            Send Email
          </button>
        </form>
      </div>
    </>
  );
};

import Layout from "../components/layout/Layout";
ForgotPasswordScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ForgotPasswordScreen;
