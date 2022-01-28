/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import Head from "next/head";
import router from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";

import { selectUser } from "../../utils/redux/userSlice";
import { demandAccessRequest } from "../../utils/redux/userAsyncActions";

const AccessRequestScreen = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector(selectUser);
  const [instagramPage, setInstagramPage] = useState(false);
  const [pageName, setPageName] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (status === "complete" && !user) router.replace("/meta-ads");
  }, [user, status]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (pageName && pageUrl) {
      dispatch(demandAccessRequest({ pageName, pageUrl, instagramPage }));
      router.push("/meta-ads");
    }
  };

  return (
    <>
      <Head>
        <title>Request Access to a Facebook Page | reglini-dz</title>
        <meta
          name="description"
          content="This page is to enter the name and the URL of the facebook page you want to give reglini-dz access to creating and managing its Meta ads."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <div className="my-12 md:my-20 mx-4 md:mx-8">
          <h1 className="">Hello, {user.name}</h1>
          <i className="fab fa-facebook-square text-facebook p-1"></i>
          <i className="fab fa-instagram text-pink-600 p-1"></i>
          <p>
            Enter the correct name and the URL (link) of your facebook page.{" "}
            <QuestionMarkCircleIcon
              onClick={openModal}
              className="h-5 w-5 inline relative bottom-1"
              aria-hidden="true"
            />
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-100 overflow-y-auto"
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
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />
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
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        How to get name and URL of facebook page?
                      </Dialog.Title>
                      <div className="min-w-xl mt-2">
                        <a href="/facebook-screenshot.png" target="_blank">
                          <img
                            src="/facebook-screenshot.png"
                            alt="facebook page screenshot"
                          />
                        </a>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={closeModal}
                        >
                          Got it, thanks!
                        </button>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition>
          </p>
          <form onSubmit={submitHandler}>
            <label htmlFor="pageName" className="sr-only">
              Name of the Facebook page
            </label>
            <input
              className="rounded-lg w-full max-w-lg my-1"
              placeholder="your page name"
              type="text"
              name="pageName"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
            />
            <br />
            <label htmlFor="pageUrl" className="sr-only">
              URL of the Facebook page (link to the page)
            </label>
            <input
              className="rounded-lg w-full max-w-lg my-1"
              placeholder="https://facebook.com/xxxxxxx"
              type="text"
              name="pageUrl"
              value={pageUrl}
              onChange={(e) => setPageUrl(e.target.value)}
            />
            <br />
            <label
              htmlFor="instagramPage"
              className="block my-3 select-none"
              onClick={() =>
                instagramPage ? setInstagramPage(false) : setInstagramPage(true)
              }
            >
              <input
                className="mr-2 w-5 h-5"
                type="checkbox"
                name="instagramPage"
                checked={instagramPage}
                onChange={(e) => setInstagramPage(e.target.checked)}
              />
              Is your professional Instagram account linked to your Facebook
              page?
            </label>
            <br />
            <button
              className="bg-facebook text-white px-4 py-1 my-1 rounded-lg"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = ({ locale }) => {
  return {
    props: {
      messages: require(`../../locales/${locale}.json`),
    },
  };
};

import Layout from "../../components/layout/Layout";
AccessRequestScreen.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default AccessRequestScreen;
