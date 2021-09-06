import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import ForgotPasswordModal from "./ForgotPasswordModal";

const Login = ({ csrfToken }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const checkEmail = async () => {
    if (email === "") {
      return setError("Email cannot be blank.");
    }
    const isValid =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    if (!isValid) {
      return setError("You should enter a valid email.");
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data, status } = await axios.post(
        "/api/auth/check/email",
        { email },
        config
      );
      if (status === 200) {
        if (data.success) {
          return setError("No account with this email address.");
        } else {
          return;
        }
      }
    } catch (error: any) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const changeEmail = (e: any) => {
    setError("");
    setEmail(e.target.value);
  };

  return (
    <>
      <form
        className="mt-6"
        autoComplete="off"
        method="POST"
        action="/api/auth/callback/login-credentials"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-base font-medium leading-relaxed text-gray-800 dark:text-gray-300"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="user@example.com"
            className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-white border border-gray-300 dark:border-gray-600 dark:bg-grim dark:text-gray-300 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
            autoComplete="off"
            required
            tabIndex={1}
            value={email}
            onChange={(e) => changeEmail(e)}
            onBlur={() => checkEmail()}
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>

        <div className="mt-4">
          <label
            className="text-base font-medium leading-relaxed text-gray-800 dark:text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-white border border-gray-300 dark:border-gray-600 dark:bg-grim dark:text-gray-300 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
            id="password"
            name="password"
            minLength={6}
            type="password"
            tabIndex={2}
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {password && !error ? (
          <button
            type="submit"
            className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-grim hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black"
            tabIndex={3}
          >
            Login
          </button>
        ) : (
          <p className="text-center text-red-900 cursor-pointer">
            Correctly fill the login form to submit.
          </p>
        )}
      </form>

      <ForgotPasswordModal />
      <p className="mt-2 mb-8 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" passHref>
          <a
            tabIndex={4}
            className="font-semibold text-gray-800 dark:text-gray-100 hover:text-black cursor-pointer"
          >
            Create one
          </a>
        </Link>
      </p>
    </>
  );
};

export default Login;
