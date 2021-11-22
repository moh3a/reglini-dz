import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useState } from "react";
import AlertMessage from "../elements/AlertMessage";

export default function ForgotPasswordModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const forgotPasswordHandler = async (e: any) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data, status } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );
      if (status === 200) {
        if (data.success) {
          setSuccess(data.data);
          setTimeout(() => {
            setSuccess("");
          }, 5000);
        } else {
          setError(data.message);
          setTimeout(() => {
            setError("");
          }, 5000);
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

  return (
    <>
      <p className="mt-2 text-center" onClick={openModal}>
        <span
          tabIndex={4}
          className="font-semibold text-gray-800 dark:text-gray-100 hover:text-black cursor-pointer"
        >
          Forgot password?
        </span>
      </p>
      {success && <AlertMessage type="success" message={success} />}
      {error && <AlertMessage type="error" message={error} />}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center align-middle transition-all transform bg-gray-100 dark:bg-grim shadow-xl rounded-2xl">
                <form onSubmit={forgotPasswordHandler}>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-800 dark:text-gray-100"
                  >
                    Forgot your password?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Please enter the email address you registered your account
                      with. We will send you a password reset link. Follow the
                      link and set your new password.
                    </p>
                  </div>

                  <div className="mt-2">
                    <input
                      className="text-gray-800"
                      type="email"
                      required
                      id="email"
                      placeholder="Email address"
                      value={email}
                      autoComplete="off"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-100 dark:text-gray-800 bg-grim dark:bg-gray-200 border border-transparent rounded-md hover:bg-gray-800 dark:hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Send email!
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
