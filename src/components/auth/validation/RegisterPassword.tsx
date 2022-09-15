import { useState, useEffect } from "react";

const RegisterPassword = ({ setPasswordValidation }: any) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [requirements, setRequirements] = useState(false);

  const [checkUpperCase, setCheckUpperCase] = useState(false);
  const [checkLowerCase, setCheckLowerCase] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);
  const [checkLength, setCheckLength] = useState(false);

  useEffect(() => {
    if (
      !checkUpperCase ||
      !checkLowerCase ||
      !checkNumber ||
      !checkLength ||
      !confirmPassword ||
      !confirmed
    ) {
      setPasswordValidation(false);
    } else if (
      confirmPassword &&
      checkUpperCase &&
      checkLowerCase &&
      checkNumber &&
      checkLength &&
      confirmed
    ) {
      setPasswordValidation(true);
    }
  }, [
    checkUpperCase,
    confirmPassword,
    checkLowerCase,
    checkNumber,
    checkLength,
    confirmed,
    setPasswordValidation,
  ]);

  const changePassword = (e: any) => {
    setConfirmPassword("");
    setConfirmed(false);
    setPassword(e.target.value);
    if (/[a-z]/g.test(e.target.value)) {
      setCheckLowerCase(true);
    } else if (!/[a-z]/g.test(e.target.value)) {
      setCheckLowerCase(false);
    }
    if (/[A-Z]/g.test(e.target.value)) {
      setCheckUpperCase(true);
    } else if (!/[A-Z]/g.test(e.target.value)) {
      setCheckUpperCase(false);
    }
    if (/[0-9]/g.test(e.target.value)) {
      setCheckNumber(true);
    } else if (!/[0-9]/g.test(e.target.value)) {
      setCheckNumber(false);
    }
    if (e.target.value.length >= 8) {
      setCheckLength(true);
    } else if (e.target.value.length < 8) {
      setCheckLength(false);
    }
  };

  const changeConfirmedPassword = (e: any) => {
    setConfirmPassword(e.target.value);
    if (password === e.target.value && confirmPassword.length > 1) {
      setConfirmed(true);
    } else {
      setConfirmed(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap mt-4 mb-6 -mx-3">
        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
          <label
            className="text-base font-medium leading-relaxed text-gray-800 dark:text-gray-300"
            htmlFor="password"
          >
            {" "}
            Password{" "}
          </label>
          <input
            className="w-full px-4 py-2 mt-2 rounded-lg shadow-md text-black"
            id="password"
            name="password"
            type="password"
            minLength={6}
            placeholder="******"
            required
            tabIndex={3}
            value={password}
            onFocus={() => setRequirements(true)}
            onChange={(e) => changePassword(e)}
            onBlur={() => setRequirements(false)}
          />
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label
            className="text-base font-medium leading-relaxed text-gray-800 dark:text-gray-300"
            htmlFor="confirm"
          >
            Confirm
          </label>
          <input
            className="w-full px-4 py-2 mt-2 rounded-lg shadow-md text-black"
            id="confirm"
            name="confirm"
            type="password"
            placeholder="******"
            minLength={6}
            required
            tabIndex={4}
            value={confirmPassword}
            onChange={(e) => changeConfirmedPassword(e)}
          />
          {confirmPassword ? (
            confirmed ? (
              <p className="text-green-500">Password confirmed!</p>
            ) : (
              <p className="text-red-500">Passwords do not match..</p>
            )
          ) : (
            ""
          )}
        </div>
      </div>
      {requirements && (
        <div className="w-full bg-gray-100 text-gray-800 p-4">
          Password must contain the following fields
          <p className={checkUpperCase ? "text-green-500" : "text-red-500"}>
            {checkUpperCase ? (
              <i className="fas fa-check"></i>
            ) : (
              <i className="fas fa-times"></i>
            )}{" "}
            An uppercase letter
          </p>
          <p className={checkLowerCase ? "text-green-500" : "text-red-500"}>
            {checkLowerCase ? (
              <i className="fas fa-check"></i>
            ) : (
              <i className="fas fa-times"></i>
            )}{" "}
            A lowercaser letter
          </p>
          <p className={checkNumber ? "text-green-500" : "text-red-500"}>
            {checkNumber ? (
              <i className="fas fa-check"></i>
            ) : (
              <i className="fas fa-times"></i>
            )}{" "}
            A number
          </p>
          <p className={checkLength ? "text-green-500" : "text-red-500"}>
            {checkLength ? (
              <i className="fas fa-check"></i>
            ) : (
              <i className="fas fa-times"></i>
            )}{" "}
            Minimum 8 characters
          </p>
        </div>
      )}
    </>
  );
};

export default RegisterPassword;
