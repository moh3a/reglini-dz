import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const ResetPasswordScreen = ({}) => {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e: any) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Password don't match");
    }
    if (token) {
      try {
        const { data } = await axios.put(
          `/api/auth/resetpassword/${token}`,
          { password },
          config
        );
        setSuccess(data.data);
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  return (
    <>
      <div onClick={() => router.back()}>Go back.</div>
      <div className="resetpassword-screen">
        <form
          className="resetpassword-screen_form"
          onSubmit={resetPasswordHandler}
        >
          <h3 className="resetpassword-screen_title">Reset password</h3>

          {/* error */}
          {error && <span className="error-message"> {error} </span>}

          {/* success */}
          {success && (
            <span className="success-message">
              {" "}
              {success} <Link href="/login">Login</Link>{" "}
            </span>
          )}

          {/* New password */}
          <div className="form-group">
            <label htmlFor="password">New password: </label>
            <input
              type="password"
              required
              id="password"
              autoComplete="true"
              placeholder="Enter new password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confrim password */}
          <div className="form-group">
            <label htmlFor="confirmpassword">Confrim password: </label>
            <input
              type="password"
              required
              id="confirmpassword"
              autoComplete="true"
              placeholder="Enter a password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
};

import Layout from "../../components/layout/Layout";
ResetPasswordScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default ResetPasswordScreen;
