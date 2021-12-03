import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RadioGroup } from "@headlessui/react";

const methods = [{ name: "ccp" }, { name: "cib" }];

const SubmitPayment = () => {
  const [selected, setSelected] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if (selected && selected.name === "ccp") console.log("ccp");
    if (selected && selected.name === "cib") console.log("cib");
  }, [selected]);

  return (
    <>
      <h3>How does it work?</h3>
      <ul>
        <li>
          First you find an item that you like, check if it can be shipped to
          Algeria and at what price.
        </li>
        <li>
          Select the properties of the item then add it to cart, or even
          directly buy it.
        </li>
        <li>
          Buying an item is submitting an order, that needs the real legal name
          and the full correct address and phone number of the buyer.
        </li>
        <li>
          If all the informations are validated, an order is created. The buyer
          then has 48 hours to submit a payment with the order&apos;s total
          amount. If no payment was submitted in 48 hours, the order will be
          automatically cancelled.
        </li>
        <li>
          After the payment was submitted and validated, you can then check the
          status of your order, and even see the tracking of your item -if your
          product&apos;s carrier provides it.
        </li>
      </ul>
      <p>
        If you have any questions you can check{" "}
        <span onClick={() => router.push("/faq")}>the FAQ</span>, or
        <span onClick={() => router.push("/support")}>
          directly send us an email
        </span>
        .
      </p>
      <h2>Choose your payment method</h2>
      <div className="w-full px-4 py-16">
        <div className="w-full max-w-md mx-auto">
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-2">
              {methods.map((method: any) => (
                <RadioGroup.Option
                  key={method.name}
                  value={method}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60"
                        : ""
                    }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {method.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? "text-sky-100" : "text-gray-500"
                              }`}
                            >
                              .
                            </RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="flex-shrink-0 text-white">
                            <CheckIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  );
};

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SubmitPayment;
