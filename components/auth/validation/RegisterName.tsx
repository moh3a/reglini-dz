import { useState, useEffect } from "react";
import axios from "axios";

const RegisterName = ({ setNameValidation }: any) => {
  const [name, setName] = useState("");
  const [nameSuccess, setNameSuccess] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (nameSuccess && name && !nameError) {
      setNameValidation(true);
    } else {
      setNameValidation(false);
    }
  }, [nameSuccess, name, nameError, setNameValidation]);

  const checkName = async () => {
    if (name === "") {
      return setNameError("Userame cannot be blank.");
    } else if (name.length < 3) {
      setNameSuccess("");
      setNameError("Username cannot be less than 3 characters long.");
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data, status } = await axios.post(
        "/api/auth/check/name",
        { name },
        config
      );
      if (status === 200) {
        if (data.success) {
          return setNameSuccess(data.message);
        } else {
          return setNameError(data.message);
        }
      }
    } catch (error) {
      setNameError(error.response.data.error);
      setName("");
      setTimeout(() => {
        setNameError("");
      }, 5000);
    }
  };
  const changeName = (e: any) => {
    setNameSuccess("");
    setNameError("");
    setName(e.target.value);
  };

  return (
    <div>
      <label
        htmlFor="name"
        className="block text-base font-medium leading-relaxed text-gray-800 dark:text-gray-300"
      >
        Username
      </label>
      <input
        className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-white border border-gray-300 dark:border-gray-600 dark:bg-grim dark:text-gray-300 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
        id="name"
        name="name"
        type="text"
        placeholder="Name"
        tabIndex={1}
        minLength={2}
        required
        value={name}
        onChange={(e) => changeName(e)}
        onBlur={() => checkName()}
      />
      {nameError && <p className="text-red-500">{nameError}</p>}
      {nameSuccess && <p className="text-green-500">{nameSuccess}</p>}
    </div>
  );
};

export default RegisterName;
