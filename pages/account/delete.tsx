import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import axios from "axios";
import { useTranslations } from "next-intl";

import { IUser } from "../../types";
import { DangerDialog } from "../../components/elements/Dialog";
import { selectUser } from "../../utils/redux/userSlice";

const DeleteAccount = ({ messages }: any) => {
  const t = useTranslations("Profile");
  let [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [session, loading]: [IUser | null, boolean] = useSession();
  const dispatch = useDispatch();
  const { isAuthenticated, status } = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session && !isAuthenticated) router.push("/");
  }, [router, session, loading, dispatch, isAuthenticated, status]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const deleteAccountHandler = async (e: any) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post("/api/user/details/delete", {}, config);
      if (!data.success) {
        setError(data.message);
        setTimeout(() => {
          setError("");
        }, 5000);
      } else if (data.success) {
        signOut();
        router.push(`/auth/login/account_deleted`);
      }
    } catch (error: any) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <Head>
        <title>
          Delete{" "}
          {session && session.user?.name
            ? `${session.user.name}'s account | `
            : ``}
          reglini-dz
        </title>
        <meta
          name="description"
          content="Permanently delete all account info and data from reglini-dz. This action is irreversible."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {error && <DangerDialog>{error}</DangerDialog>}
      <div className="text-center mx-8 lg:mx-32 my-60">
        <p className="text-xl lg:text-4xl">{t("deleteWarning")}</p>
        <button
          onClick={openModal}
          className="bg-red-400 hover:bg-red-500 text-gray-100 text-2xl py-2 px-4 mt-6 rounded-full"
        >
          {t("delete")}
        </button>
        <br />
        <button
          onClick={() => router.push("/")}
          className="bg-gray-400 hover:bg-gray-500 text-gray-100 text-xl py-2 px-4 mt-1 rounded-full"
        >
          {t("goHome")}
        </button>
      </div>
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
                <form onSubmit={deleteAccountHandler}>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-800 dark:text-gray-100"
                  >
                    DELETE YOUR ACCOUNT
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {t("deleteFinalWarning")}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-100 bg-red-400 border border-transparent rounded-full hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                      onClick={closeModal}
                    >
                      {t("finalDelete")}
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
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../components/layout/Layout";
DeleteAccount.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default DeleteAccount;
