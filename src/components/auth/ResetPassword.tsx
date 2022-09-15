import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import AlertMessage from "../elements/AlertMessage";

const ResetPassword = ({ token }: { token: string | string[] | undefined }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

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
        setTimeout(() => {
          setSuccess("");
          router.push("/");
        }, 3000);
      } catch (error: any) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  return (
    <section className="flex flex-col items-center my-8 md:flex-row">
      <div className="container mx-auto">
        <div className="flex justify-center px-2 py-6 ">
          <div className="w-full max-w-sm px-8 py-24 bg-white dark:bg-grim rounded-lg border-gray-800  lg:rounded-l-none s lg:shadow-xl">
            <div className="relative z-0 text-left ">
              <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100">
                Reset Your Password
              </h1>
              {success && <AlertMessage type="success" message={success} />}
              {error && <AlertMessage type="error" message={error} />}
              <form
                className="mt-6"
                autoComplete="off"
                onSubmit={resetPasswordHandler}
              >
                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="block text-base font-medium leading-relaxed text-gray-800 dark:text-gray-300"
                  >
                    New password
                  </label>
                  <input
                    className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-white border border-gray-300 dark:border-gray-600 dark:bg-grim dark:text-gray-300 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="******"
                    minLength={6}
                    required
                    tabIndex={1}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="text-base font-medium leading-relaxed text-gray-800 dark:text-gray-300"
                    htmlFor="confirmpassword"
                  >
                    Confirm new password
                  </label>
                  <input
                    className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-white border border-gray-300 dark:border-gray-600 dark:bg-grim dark:text-gray-300 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    placeholder="******"
                    minLength={6}
                    required
                    tabIndex={2}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-grim hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black"
                  tabIndex={3}
                >
                  Set new password !
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ResetPassword;
