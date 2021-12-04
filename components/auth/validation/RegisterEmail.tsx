import { useState, useEffect } from "react";
import axios from "axios";

const RegisterEmail = ({ setEmailValidation }: any) => {
  const [email, setEmail] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (emailSuccess && email && !emailError) {
      setEmailValidation(true);
    } else {
      setEmailValidation(false);
    }
  }, [emailSuccess, email, emailError, setEmailValidation]);

  const checkEmail = async () => {
    if (email === "") {
      return setEmailError("Email cannot be blank.");
    }
    const isValid =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );
    if (!isValid) {
      return setEmailError("You should enter a valid email.");
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
          return setEmailSuccess(data.message);
        } else {
          return setEmailError(data.message);
        }
      }
    } catch (error: any) {
      setEmailError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setEmailError("");
      }, 5000);
    }
  };
  const changeEmail = (e: any) => {
    setEmailSuccess("");
    setEmailError("");
    setEmail(e.target.value);
  };

  return (
    <div className="mt-4">
      <label
        htmlFor="email"
        className="block text-base font-medium leading-relaxed text-gray-800 dark:text-gray-300"
      >
        Email Address
      </label>
      <input
        className="w-full px-4 py-2 mt-2 rounded-lg shadow-md text-black"
        id="email"
        name="email"
        type="email"
        placeholder="user@example.com"
        autoComplete="off"
        required
        tabIndex={2}
        value={email}
        onChange={(e) => changeEmail(e)}
        onBlur={() => checkEmail()}
      />
      {emailError && <p className="text-red-500">{emailError}</p>}
      {emailSuccess && <p className="text-green-500">{emailSuccess}</p>}
    </div>
  );
};

export default RegisterEmail;
