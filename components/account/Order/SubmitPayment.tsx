import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { RadioGroup } from "@headlessui/react";

import AlertMessage from "../../elements/AlertMessage";

const SubmitPayment = ({ order, setOpenPayNow }: any) => {
  const [selected, setSelected] = useState<any>();
  const [image, setImage] = useState<any>();
  const [createObjectURL, setCreateObjectURL] = useState<string>();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
    const { data } = await axios.post("/api/users/orderpayment", body);
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
      <h2>Choose your payment method</h2>
      <div className="w-full max-w-md mx-auto">
        <RadioGroup
          value={selected}
          onChange={setSelected}
          className="flex my-2"
        >
          <RadioGroup.Label className="sr-only">
            payment method:{" "}
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
                Payment enligne par CIB
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
                  Versement CCP
                </span>
              </>
            )}
          </RadioGroup.Option>
        </RadioGroup>
      </div>
      {selected && (
        <div>
          {success && <AlertMessage type="success" message={success} />}
          {error && <AlertMessage type="error" message={error} />}
          <div className="mt-6">
            {selected === "ccp" && (
              <>
                <h1 className="text-xl">Payment by CCP</h1>
                <p>
                  Take a picture of the receipt. It should be clear and easy to
                  read to validate the payment.
                </p>
              </>
            )}
            {selected === "cib" && (
              <>
                <h1 className="text-xl">Payment by CIB</h1>
                <p>
                  Take a screenshot of your payment directly from the Baridi Mob
                  app or your bank account app.
                </p>
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
                <small>
                  Do not mind the image format, it will be fixed on the upload.
                </small>
                <div className="flex justify-end">
                  <button
                    onClick={(e) => uploadToServer(e)}
                    className="w-44 bg-green-200 hover:bg-green-300 dark:bg-green-500 p-1 rounded-md my-2"
                  >
                    {selected === "ccp" && "Send Receipt"}
                    {selected === "cib" && "Send Payment Memo"}
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
