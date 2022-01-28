/* eslint-disable @next/next/no-img-element */
import { Fragment, useState } from "react";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { IFacebookPage } from "../../utils/types";
import AlertMessage from "../elements/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { submitPayment } from "../../utils/redux/userAsyncActions";
import { selectUser } from "../../utils/redux/userSlice";
import { PhotographIcon } from "@heroicons/react/outline";

function CreatedAds({ page }: { page: IFacebookPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<any>();
  const [image, setImage] = useState<any>();
  const [createObjectURL, setCreateObjectURL] = useState<string>();
  const [wait, setWait] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { status } = useSelector(selectUser);
  const t = useTranslations("Orders");

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (pageId: string, adCreatedAt: string) => {
    setWait(true);
    const body = new FormData();
    body.append("file", image);
    body.append("pageId", pageId);
    body.append("paymentMethod", selected);
    body.append("adCreatedAt", adCreatedAt);
    dispatch(submitPayment({ body, url: "/api/user/metaads/ad/adpayment" }));
    setTimeout(() => {
      if (status !== "loading") {
        setWait(false);
        closeModal();
      }
    }, 500);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <h3 className="mt-8 text-xl font-bold">Created ads</h3>
      {page.page_ads && page.page_ads.length > 0 ? (
        page.page_ads.map((ad) => (
          <div
            className="w-full border border-gray-600 dark:border-white rounded-lg my-2 p-1 md:py-1 md:px-5"
            key={ad.created_at}
          >
            <div>Created ad: {ad.created_at}</div>
            <div>
              {ad.ad_emplacement} post:{" "}
              <a
                href={ad.post_url}
                className="font-semibold text-gray-600 dark:text-gray-400"
                target="_blank"
                rel="noreferrer"
              >
                view the post
              </a>
              .
            </div>
            <div>
              Ad status:{" "}
              <span
                className={`${
                  (ad.ad_status === "request_new_ad" ||
                    ad.ad_status === "processing_payment") &&
                  "text-orange-500"
                } ${ad.ad_status === "awaiting_payment" && "text-indigo-500"} ${
                  ad.ad_status === "ad_success" && "text-green-500"
                } ${ad.ad_status === "ad_fail" && "text-red-500"} font-bold`}
              >
                {ad.ad_status}
              </span>
            </div>
            <div>
              {ad.ad_audience} - {ad.ad_duration} days - {ad.ad_price} DZD
            </div>
            {ad.ad_status === "awaiting_payment" && (
              <>
                <button
                  onClick={openModal}
                  className="px-3 py-1 bg-indigo-500 text-white rounded-lg"
                >
                  {t("payNow")}
                </button>
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
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />
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
                        <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-grim shadow-xl rounded-2xl">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                          >
                            Payment form
                          </Dialog.Title>

                          {/* payment UI */}
                          <div className="px-4 py-5 sm:px-6">
                            <h1>
                              {t("totalAmount")} {ad.ad_price} DZD.{" "}
                              <Link href="/faq">
                                <a
                                  className="underline font-serif"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {t("learnHowToPay")}
                                </a>
                              </Link>
                            </h1>
                            {selected === "ccp" && (
                              <div className="mt-2 px-2 py-3 border border-gray-200 bg-gray-50 dark:bg-black dark:border-yellow-200 rounded-lg">
                                <p>{t("ccpToThis")}:</p>
                                <p>
                                  {t("nameAndSurname")}:{" "}
                                  <span className="font-bold">
                                    AIT ABDELMALEK MOHAMED ALI
                                  </span>
                                </p>
                                <p>
                                  {t("accountId")} (CCP):{" "}
                                  <span className="font-bold">
                                    0020008646 02
                                  </span>
                                </p>
                              </div>
                            )}
                            {selected === "cib" && (
                              <div className="mt-2 px-2 py-3 border border-gray-200 bg-gray-50 dark:bg-black dark:border-yellow-200 rounded-lg">
                                <p>{t("cibToThis")}</p>
                                <p className="font-bold text-center">
                                  007 99999 0020008646 02
                                </p>
                              </div>
                            )}
                            <br />
                            {ad.ad_price < 50000 ? (
                              <>
                                <h1>{t("choosePaymentMethod")}</h1>
                                <div className="w-full max-w-md mx-auto">
                                  <RadioGroup
                                    value={selected}
                                    onChange={setSelected}
                                    className="flex my-2"
                                  >
                                    <RadioGroup.Label className="sr-only">
                                      {t("paymentMethod")}:{" "}
                                    </RadioGroup.Label>
                                    <div className="flex w-full justify-center items-center flex-col md:flex-row">
                                      <RadioGroup.Option
                                        className="my-2"
                                        value="cib"
                                      >
                                        {({ checked }) => (
                                          <span
                                            className={`mx-1 border-2 rounded-md p-1 text-black ${
                                              checked
                                                ? "border-red-300 bg-red-200 dark:border-red-600 dark:bg-red-400"
                                                : "border-gray-200 bg-gray-200"
                                            }`}
                                          >
                                            {t("cib")}
                                          </span>
                                        )}
                                      </RadioGroup.Option>
                                      <RadioGroup.Option
                                        className="my-2"
                                        value="ccp"
                                      >
                                        {({ checked }) => (
                                          <>
                                            <span
                                              className={`mx-1 border-2 rounded-md p-1 text-black ${
                                                checked
                                                  ? "border-red-300 bg-red-200 dark:border-red-600 dark:bg-red-400"
                                                  : "border-gray-200 bg-gray-200"
                                              }`}
                                            >
                                              {t("ccp")}
                                            </span>
                                          </>
                                        )}
                                      </RadioGroup.Option>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </>
                            ) : (
                              <h1>{t("onlyCCP")}</h1>
                            )}
                            {selected && (
                              <div>
                                {success && (
                                  <AlertMessage
                                    type="success"
                                    message={success}
                                  />
                                )}
                                {error && (
                                  <AlertMessage type="error" message={error} />
                                )}
                                <div className="mt-6">
                                  {selected === "ccp" && (
                                    <div>
                                      <h1 className="text-xl">
                                        {t("paymentCCP")}
                                      </h1>
                                      <p>{t("descPaymentCCP")}</p>
                                    </div>
                                  )}
                                  {selected === "cib" && (
                                    <>
                                      <h1 className="text-xl">
                                        {t("paymentCIB")}
                                      </h1>
                                      <p>{t("descPaymentCIB")}</p>
                                    </>
                                  )}
                                </div>

                                <div className="flex flex-col mt-10 ">
                                  <input
                                    className="mb-2"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    name="image"
                                    onChange={uploadToClient}
                                  />
                                  {createObjectURL && (
                                    <>
                                      <div className="shadow w-56 my-2 border border-yellow-200">
                                        <img src={createObjectURL} alt="" />
                                      </div>
                                      <small>{t("doNotMind")}</small>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                          {wait && (
                            <div className="text-lg text-center text-red-500">
                              <span className="relative top-1 inline-block border-4 border-dashed rounded-full h-5 w-5 border-red-500 animate-spin mr-1" />
                              please wait...
                            </div>
                          )}

                          {/* actions buttons */}
                          <div className="flex flex-col justify-center items-center md:flex-row md:justify-around">
                            {createObjectURL && (
                              <div className="my-1">
                                <button
                                  onClick={(e) =>
                                    uploadToServer(page.page_id, ad.created_at)
                                  }
                                  className="h-full bg-green-200 hover:bg-green-300 dark:bg-green-500 py-1 px-3 rounded-lg"
                                >
                                  {selected === "ccp" && t("sendReceipt")}
                                  {selected === "cib" && t("sendMemo")}
                                </button>
                              </div>
                            )}
                            <div className="my-1">
                              <button
                                type="button"
                                className="h-full flex justify-center items-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-500 rounded-lg py-1 px-3"
                                onClick={closeModal}
                              >
                                {t("cancelPrompt")}
                              </button>
                            </div>
                          </div>
                        </div>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition>
              </>
            )}
            {ad.ad_status === "processing_payment" && (
              <div className="border border-green-400 bg-green-300 rounded-lg p-1">
                <div>
                  Your payment was successfully submitted and is now being
                  processed.
                </div>
                <a
                  href={ad.payment?.receipt}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold"
                >
                  You can view your payment receipt here{" "}
                  <PhotographIcon
                    className="w-5 h-5 inline"
                    aria-hidden="true"
                  />
                </a>
              </div>
            )}
          </div>
        ))
      ) : (
        <div>No ads yet.</div>
      )}
    </div>
  );
}

export default CreatedAds;
