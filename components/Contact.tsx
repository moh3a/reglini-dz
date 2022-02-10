import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import axios from "axios";
import { SuccessDialog, DangerDialog } from "./elements/Dialog";

const Contact = () => {
  const t = useTranslations("Contact");
  const router = useRouter();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await axios.post("/api/email", {
      subject: subject,
      message: message,
    });
    setSubject("");
    setMessage("");
    if (data.status === 200) {
      setSuccess(data.data.message);
    } else if (data.status === 400) {
      setError(data.data.message);
    }
  };

  return (
    <section className="w-full max-w-2xl px-6 py-4 mx-auto lg:mb-32 my-16 bg-yellow-100 border-2 border-yellow-200 rounded-md shadow-md dark:bg-grim dark:text-yellow-100">
      {success && <SuccessDialog>{success} </SuccessDialog>}
      {error && <DangerDialog>{error} </DangerDialog>}
      <h1 className="text-3xl font-semibold text-center ">{t("getInTouch")}</h1>
      <p className="mt-3 text-center">{t("yourFeedback")}</p>

      <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3">
        <a className="cursor-pointer flex flex-col items-center px-4 py-3 rounded-lg  hover:bg-purple-200 dark:hover:bg-purple-800">
          <svg
            className="w-5 h-5 text-purple-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>

          <span className="mt-2">{t("address")}</span>
        </a>

        <a className="cursor-pointer flex flex-col items-center px-4 py-3  rounded-lg  hover:bg-green-200 dark:hover:bg-green-800">
          <i className="fab fa-whatsapp text-green-500"></i>

          <span className="mt-2">+213540861775</span>
        </a>

        <a className="cursor-pointer flex flex-col items-center px-4 py-3  rounded-lg  hover:bg-orange-200 dark:hover:bg-orange-800 text-xs">
          <svg
            className="w-5 h-5 text-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>

          <span className="mt-2">support@reglini-dz.com</span>
        </a>
      </div>
      <p className="my-4 text-base text-center md:text-lg">
        {t("haveAQuestion")}{" "}
        <Link href="/faq" passHref>
          <a className="underline text-gray-700 dark:text-gray-400">
            {t("checkFaq")}
          </a>
        </Link>
      </p>

      <form className="mt-6 " onSubmit={submitHandler}>
        <div className="items-center -mx-2 md:flex">
          <div className="w-full mx-2">
            <label
              htmlFor="subject"
              className={`block ${
                router.locale === "ar" ? "text-right" : ""
              } mb-2 text-sm font-medium text-gray-600 dark:text-gray-200`}
            >
              {t("emailSubject")}
            </label>

            <input
              placeholder={t("emailTitle")}
              autoComplete="off"
              className={`${
                router.locale === "ar" ? "text-right" : ""
              } block w-full px-4 py-2 border-yellow-200 rounded-lg dark:bg-grim dark:text-gray-100 dark:border-yellow-200 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring`}
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full mt-4">
          <label
            htmlFor="message"
            className={`${
              router.locale === "ar" ? "text-right" : ""
            } block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200`}
          >
            {t("message")}
          </label>

          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="block w-full h-40 px-4 py-2  border border-yellow-200 rounded-lg dark:bg-grim dark:text-gray-100 dark:border-yellow-200 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          ></textarea>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            {t("send")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
