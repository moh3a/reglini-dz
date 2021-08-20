import { useState } from "react";
import Link from "next/link";

const Register = ({ csrfToken }: any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <form className="mt-6" action="#" method="POST">
        <div>
          <label
            htmlFor="username"
            className="block text-base font-medium leading-relaxed text-gray-800 dark:text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-white border border-gray-300 dark:border-gray-600 dark:bg-grim dark:text-gray-300 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
          />
        </div>
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
          />
        </div>
        <div className="flex flex-wrap mt-4 mb-6 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="text-base font-medium leading-relaxed text-gray-800 dark:text-gray-300"
              htmlFor="password"
              //   minLength="6"
            >
              {" "}
              Password{" "}
            </label>
            <input
              className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-white border border-gray-300 dark:border-gray-600 dark:bg-grim dark:text-gray-300 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
              id="password"
              type="password"
              placeholder="******"
            />
            <p className="mt-1 text-xs italic text-gray-800 dark:text-gray-100">
              Please fill out this field.
            </p>
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="text-base font-medium leading-relaxed text-gray-800 dark:text-gray-300"
              htmlFor="confirm"
            >
              {" "}
              Confirm{" "}
            </label>
            <input
              className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-white border border-gray-300 dark:border-gray-600 dark:bg-grim dark:text-gray-300 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500 "
              id="confirm"
              type="password"
              placeholder="******"
            />
          </div>
        </div>
        <button
          type="submit"
          className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-black hover:from-black to-black focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black"
        >
          Register
        </button>
      </form>
      <p className="mt-8 text-center">
        Already have an account?{" "}
        <Link href="/login" passHref>
          <span className="font-semibold text-gray-800 dark:text-gray-100 hover:text-black cursor-pointer">
            Sign In
          </span>
        </Link>
      </p>
    </>
  );
};

export default Register;
