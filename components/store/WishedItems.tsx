import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import { SuccessDialog } from "../elements/Dialog";
import { removeFromWishlist } from "../../utils/redux/userAsyncActions";
import { selectUser } from "../../utils/redux/userSlice";

const WishedItems = ({ wishlist }: any) => {
  const t = useTranslations("Wishlist");
  const [success, setSuccess] = useState("");
  const { message } = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (message === "Item successfully deleted from wishlist.") {
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setSuccess(message);
    }
  }, [message]);

  return (
    <div className="my-8 mx-2">
      {success && <SuccessDialog>{success} </SuccessDialog>}
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {wishlist.map((item: any) => {
          return (
            <div
              key={item.productId}
              className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-grim"
            >
              <div className="px-4 py-2">
                <h1 className="h-10 w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="120"
                    height="60"
                  >
                    <g fill="#e43225">
                      <path d="M35.742 35.825V20.083h9.296v1.972h-7.374v4.84h6.628v1.972h-6.628v4.938h7.888v1.972h-9.8zm19.586 0L52.13 31.65l-3.182 4.176h-2.254l4.375-5.584-4.607-5.783h2.535l3.148 4.325 3.198-4.325h2.486l-4.375 5.783 4.126 5.584zm5.352-1.7V41.9h-1.922V30.3c0-2.966 2.254-6.115 5.783-6.115 3.563 0 6.247 2.254 6.247 5.965 0 3.612-2.718 6.115-5.816 6.115-1.508 0-3.53-.663-4.292-2.12zm8.086-3.994c0-2.535-1.64-4.043-4.557-3.894-1.4.05-3.563 1.077-3.38 4.7.05 1.177 1.276 3.38 3.944 3.38 2.303.017 3.994-1.3 3.994-4.176zm3.664 5.684V24.457h1.922v1.226c.945-1.077 2.403-1.458 3.944-1.458v2.07c-.232-.05-2.535-.33-3.944 2.684v6.9H72.43zm6.395-5.675c0-3.28 2.353-5.965 5.584-5.965 4.043 0 5.535 2.684 5.535 6.115v.945H80.93c.15 2.154 2.07 3.28 3.844 3.248 1.3-.05 2.204-.43 3.148-1.36l1.276 1.3c-1.177 1.127-2.684 1.872-4.507 1.872-3.43-.05-5.866-2.585-5.866-6.164zm5.435-4.043c-1.84 0-3.248 1.6-3.33 3.33h6.993c0-1.674-1.2-3.33-3.662-3.33z" />
                      <use xlinkHref="#A" />
                      <use xlinkHref="#A" x="9.91" />
                    </g>
                    <path
                      d="M22.684 35.825l-1.4-3.762H13.67l-1.4 3.762h-2.02l6.115-15.742h2.204l6.065 15.742zM17.38 22.353l-2.867 7.805h5.965zm8.502 13.472V20.083h1.972v15.742zm4.938 0V24.7h1.972v11.135zm3.844-14.748v-.2c-1.508-.05-2.718-1.276-2.767-2.767H31.6c-.05 1.508-1.276 2.718-2.767 2.767v.2c1.508.05 2.718 1.276 2.767 2.767h.298a2.87 2.87 0 0 1 2.767-2.767z"
                      fill="#f7971d"
                    />
                    <defs>
                      <path
                        id="A"
                        d="M90.938 34.234l1.4-1.276c-.05 0 .713.746.795.795a2.5 2.5 0 0 0 1.077.563c1.226.33 3.43.232 3.612-1.458.1-.945-.613-1.458-1.4-1.8-1.027-.38-2.154-.514-3.198-.994-1.177-.514-1.922-1.4-1.922-2.718 0-3.43 4.888-3.994 7.092-2.403l1.127 1.077-1.4 1.127c-.713-.845-1.36-1.276-2.867-1.276-.746 0-1.8.33-1.972 1.127-.282 1.127.994 1.558 1.84 1.8 1.127.282 2.353.464 3.33 1.077 1.36.845 1.7 2.684 1.177 4.093-.563 1.558-2.254 2.154-3.762 2.204-1.8.1-3.33-.464-4.607-1.74-.083.033-.315-.2-.315-.2z"
                      />
                    </defs>
                  </svg>
                </h1>
                <p
                  className={`${
                    router.locale === "ar" && "text-right"
                  } text-sm text-black dark:text-yellow-100`}
                >
                  {item.name}
                </p>
                <p
                  className={`text-xs font-extrabold text-gray-800 dark:text-yellow-200 ${
                    router.locale === "ar" && "text-right flex flex-row-reverse"
                  }`}
                >
                  <span>{item.price}</span>
                  <span>{t("DZD")}</span>
                </p>
              </div>

              <Image
                className="object-cover w-full h-48 mt-2"
                src={item.imageUrl}
                alt={item.name}
                height={100}
                width={100}
                layout="responsive"
              />

              <div className="flex items-center justify-between px-4 py-2">
                <p className="text-sm font-bold">
                  {item.createdAt.substring(0, 10)}{" "}
                  {item.createdAt.substring(11, 16)}
                </p>
                <button
                  onClick={() =>
                    dispatch(removeFromWishlist({ id: item.productId }))
                  }
                  className="px-2 py-1 text-xs text-gray-100 uppercase transition-colors duration-200 transform bg-red-500 rounded hover:opacity-80 focus:bg-gray-400 focus:outline-none"
                >
                  {t("remove")}
                </button>
                <button
                  onClick={() =>
                    router.push(`/aliexpress/product/${item.productId}`)
                  }
                  className="px-2 py-1 text-xs text-gray-900 uppercase transition-colors duration-200 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
                >
                  {t("viewDetails")}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default WishedItems;
