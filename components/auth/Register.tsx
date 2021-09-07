import { useState, useEffect } from "react";
import Link from "next/link";

import RegisterEmail from "./validation/RegisterEmail";
import RegisterName from "./validation/RegisterName";
import RegisterPassword from "./validation/RegisterPassword";

const Register = ({ csrfToken }: any) => {
  const [valid, setValid] = useState(false);
  const [nameValidation, setNameValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(false);

  useEffect(() => {
    if (nameValidation && passwordValidation && emailValidation) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [nameValidation, passwordValidation, emailValidation]);

  return (
    <>
      <form
        className="mt-6"
        autoComplete="off"
        action="/api/auth/callback/register-credentials"
        method="POST"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <RegisterName setNameValidation={setNameValidation} />
        <RegisterEmail setEmailValidation={setEmailValidation} />
        <RegisterPassword setPasswordValidation={setPasswordValidation} />
        {valid ? (
          <button
            tabIndex={5}
            type="submit"
            className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-black hover:from-black to-black focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black"
          >
            Register
          </button>
        ) : (
          <p className="text-center text-red-900 cursor-pointer">
            Fill the register form to submit.
          </p>
        )}
      </form>
      <p className="mt-8 text-center">
        Already have an account?{" "}
        <Link href="/login" passHref>
          <a
            className="font-semibold text-gray-800 dark:text-gray-100 hover:text-black"
            tabIndex={6}
          >
            Sign In
          </a>
        </Link>
      </p>
    </>
  );
};

export default Register;
