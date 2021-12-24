import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import axios from "axios";
import { RadioGroup } from "@headlessui/react";

import AlertMessage from "../../elements/AlertMessage";

const SubmitPayment = ({ order, setOpenPayNow }: any) => {
  const t = useTranslations("Orders");
  const [selected, setSelected] = useState<any>();
  const [image, setImage] = useState<any>();
  const [createObjectURL, setCreateObjectURL] = useState<string>();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (order.product.totalPrice > 50000) {
      setSelected("ccp");
    }
  }, [order]);

  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event: any) => {
    const body = new FormData();
    body.append("file", image);
    body.append("orderId", order.orderId);
    body.append("paymentMethod", selected);
    const { data } = await axios.post("/api/user/details/orderpayment", body);
    if (data.success) {
      setSuccess(data.message);
      setOpenPayNow(false);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } else {
      setError(data.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="px-4 py-5 sm:px-6">
      <h1>
        The total amount to be paid is {order.product.totalPrice} DZD.{" "}
        <Link href="/faq">
          <a className="underline font-serif" target="_blank" rel="noreferrer">
            Click here to learn how to pay
          </a>
        </Link>
      </h1>
      {selected === "ccp" && (
        <div>
          <p>Le versement CCP se fait au compte suivant:</p>
          <p>Nom et prenom: AIT ABDELMALEK MOHAMED ALI</p>
          <p>Numero de compte: 0020008646 cle 02</p>
        </div>
      )}
      {selected === "cib" && (
        <div>
          <p>
            Pour une transaction en CIB, le versement se fait au numero de
            compte suivant:
          </p>
          <p>00799999002000864602</p>
        </div>
      )}
      <br />
      {order.product.totalPrice < 50000 ? (
        <>
          <h2>{t("choosePaymentMethod")}</h2>
          <div className="w-full max-w-md mx-auto">
            <RadioGroup
              value={selected}
              onChange={setSelected}
              className="flex my-2"
            >
              <RadioGroup.Label className="sr-only">
                {t("paymentMethod")}:{" "}
              </RadioGroup.Label>
              <RadioGroup.Option value="cib">
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
              <RadioGroup.Option value="ccp">
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
            </RadioGroup>
          </div>
        </>
      ) : (
        <h2>Payment can only be via CCP.</h2>
      )}
      {selected && (
        <div>
          {success && <AlertMessage type="success" message={success} />}
          {error && <AlertMessage type="error" message={error} />}
          <div className="mt-6">
            {selected === "ccp" && (
              <>
                <h1 className="text-xl">{t("paymentCCP")}</h1>
                <p>{t("descPaymentCCP")}</p>
              </>
            )}
            {selected === "cib" && (
              <>
                <h1 className="text-xl">{t("paymentCIB")}</h1>
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
                <div className="w-128 shadow my-2 border border-yellow-200">
                  <Image
                    loader={() => createObjectURL}
                    src={createObjectURL}
                    alt=""
                    width={50}
                    height={50}
                    layout="responsive"
                  />
                </div>
                <small>{t("doNotMind")}</small>
                <div className="flex justify-end">
                  <button
                    onClick={(e) => uploadToServer(e)}
                    className="w-44 bg-green-200 hover:bg-green-300 dark:bg-green-500 p-1 rounded-md my-2"
                  >
                    {selected === "ccp" && t("sendReceipt")}
                    {selected === "cib" && t("sendMemo")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitPayment;
