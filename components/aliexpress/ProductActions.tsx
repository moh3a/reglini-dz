import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SuccessDialog, DangerDialog, WarningDialog } from "../elements/Dialog";
import { addToWishlist, addToCart } from "../../utils/redux/userAsyncActions";

export const ToDetails = ({ id }: { id: string }) => {
  const t = useTranslations("AEProduct");
  return (
    <button className="flex ml-auto text-white bg-aliexpress border-0 py-2 px-6 focus:outline-none hover:opacity-60 rounded">
      <Link href={`/aliexpress/product/${id}`}>
        <a>{t("viewDetails")}</a>
      </Link>
    </button>
  );
};

export const BuyProduct = ({
  product,
  session,
  setError,
  selectedVariation,
  selectedShipping,
  converter,
}: any) => {
  const t = useTranslations("AEProduct");
  const router = useRouter();
  const buyHandler = (e: any) => {
    let price, shippingPrice: any;
    if (selectedVariation.sku /*|| selectedVariation.price.app*/) {
      price = selectedVariation.price.app.hasDiscount
        ? selectedVariation.price.app.discountedPrice.value
        : selectedVariation.price.app.originalPrice.value;
      shippingPrice = selectedShipping.price.value;
    }
    e.preventDefault();
    if (!session) {
      setTimeout(() => {
        setError("");
      }, 3000);
      setError(t("logInToAdd"));
    } else if (session) {
      if (!selectedVariation.sku /*&& !selectedVariation.price.app*/) {
        setTimeout(() => {
          setError("");
        }, 3000);
        setError(t("selectProperties"));
      } else if (selectedVariation.sku /*|| selectedVariation.price.app*/) {
        localStorage.setItem(
          "aeno",
          JSON.stringify([
            {
              productId: product.productId,
              name: product.title,
              price: converter(price),
              originalPrice: price,
              imageUrl: selectedVariation.imageUrl,
              properties: selectedVariation.properties,
              quantity: selectedVariation.quantity,
              sku: selectedVariation.sku,
              carrierId: selectedShipping.company.id,
              shippingPrice: converter(shippingPrice),
              totalPrice:
                (converter(price) + converter(shippingPrice)) *
                selectedVariation.quantity,
            },
          ])
        );
        router.push("/account/orders/new");
      }
    }
  };
  return (
    <button
      className="flex ml-auto text-white bg-aliexpress border-0 py-2 px-6 focus:outline-none hover:opacity-60 rounded"
      onClick={buyHandler}
    >
      {t("buy")}
    </button>
  );
};

export const ProductToCart = ({
  product,
  session,
  setError,
  selectedVariation,
  selectedShipping,
  converter,
}: any) => {
  const t = useTranslations("AEProduct");
  const dispatch = useDispatch();
  const addToCartHandler = (e: any) => {
    let price, shippingPrice;
    if (selectedVariation.sku /* || selectedVariation.price.app*/) {
      price = selectedVariation.price.app.hasDiscount
        ? selectedVariation.price.app.discountedPrice.value
        : selectedVariation.price.app.originalPrice.value;
      shippingPrice = selectedShipping.price.value;
    }
    e.preventDefault();
    if (!session) {
      setTimeout(() => {
        setError("");
      }, 3000);
      setError(t("logInToAdd"));
    } else if (session) {
      if (!selectedVariation.sku /* && !selectedVariation.price.app*/) {
        setTimeout(() => {
          setError("");
        }, 3000);
        setError(t("selectProperties"));
      } else if (selectedVariation.sku /*|| selectedVariation.price.app*/) {
        dispatch(
          addToCart({
            productId: product.productId,
            name: product.title,
            price: converter(price),
            originalPrice: price,
            imageUrl: selectedVariation.imageUrl,
            properties: selectedVariation.properties,
            quantity: selectedVariation.quantity,
            sku: selectedVariation.sku,
            carrierId: selectedShipping.company.id,
            shippingPrice: converter(shippingPrice),
            totalPrice:
              (converter(price) + converter(shippingPrice)) *
              selectedVariation.quantity,
          })
        );
      }
    }
  };

  return (
    <button
      onClick={addToCartHandler}
      className="flex ml-4 text-white bg-aliexpress border-0 py-2 px-6 focus:outline-none hover:opacity-60 rounded"
    >
      {t("cart")}
    </button>
  );
};

export const ProductToWishlist = ({
  product,
  session,
  setError,
  converter,
}: any) => {
  const t = useTranslations("AEProduct");
  const dispatch = useDispatch();
  const addToWishlistHandler = (e: any) => {
    e.preventDefault();
    if (!session) {
      setTimeout(() => {
        setError("");
      }, 3000);
      setError(t("logInToAdd"));
    } else if (session) {
      dispatch(
        addToWishlist({
          productId: product.productId,
          name: product.title,
          price: converter(
            product.priceSummary
              ? product.priceSummary.app.originalPrice.min.value
              : product.price.app.originalPrice.value
          ),
          imageUrl: product.productImages[0],
        })
      );
    }
  };
  return (
    <button
      onClick={addToWishlistHandler}
      className="rounded-full hover:bg-aliexpress h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 hover:text-gray-100 py-2 px-6 ml-4"
    >
      <svg
        fill="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-5 h-5 "
        viewBox="0 0 24 24"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
      </svg>
      <span className="ml-1">{product.wishlistCount}</span>
    </button>
  );
};

export const ActionFeedback = ({
  message,
  error,
}: {
  message: string;
  error?: string;
}) => {
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");
  useEffect(() => {
    if (message === "Item is already in the wishlist.") {
      setTimeout(() => {
        setWarning("");
      }, 3000);
      setWarning(message);
    } else if (
      message === "Order successfully submitted and awaiting payment."
    ) {
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setSuccess(message);
    } else if (message === "Item successfully added to wishlist.") {
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setSuccess(message);
    } else if (message === "Item successfully added to cart.") {
      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setSuccess(message);
    }
  }, [message]);
  return (
    <>
      {warning && <WarningDialog>{warning}</WarningDialog>}
      {success && <SuccessDialog>{success}</SuccessDialog>}
      {error && (
        <DangerDialog
        // action="Login" actionUrl="/login"
        >
          {error}
        </DangerDialog>
      )}
    </>
  );
};
