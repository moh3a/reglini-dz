import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { SuccessDialog, DangerDialog, WarningDialog } from "../elements/Dialog";
import { addToWishlist, addToCart } from "../../utils/redux/userAsyncActions";
import { IAffiliateProduct } from "../../types/AETypes";
import { IUserRedux } from "../../types";

export interface SelectedVariation {
  imageUrl: string;
  quantity: number;
  sku_stock: boolean;
  sku_price: string;
  sku_code: string;
  ipm_sku_stock: number;
  id: string;
  currency_code: string;
  aeop_s_k_u_propertys: {
    aeop_sku_property: [
      {
        sku_property_id: number;
        sku_image: string;
        property_value_id_long: number;
        property_value_definition_name: string;
        sku_property_value: string;
        sku_property_name: string;
      }
    ];
  };
  barcode: string;
  offer_sale_price: string;
  offer_bulk_sale_price: string;
  sku_bulk_order: number;
  s_k_u_available_stock: number;
}

export interface SelectedShipping {
  error_code: number;
  estimated_delivery_time: string;
  freight: {
    amount: number;
    cent: number;
    currency_code: string;
  };
  service_name: string;
}

export const BuyProduct = ({
  product,
  user,
  setError,
  selectedVariation,
  selectedShipping,
  converter,
}: {
  product: IAffiliateProduct;
  user: IUserRedux;
  setError: any;
  selectedVariation: SelectedVariation | undefined;
  selectedShipping: SelectedShipping;
  converter: (price: number) => number | undefined;
}) => {
  const t = useTranslations("AEProduct");
  const router = useRouter();
  const buyHandler = (e: any) => {
    let discount = product.discount ? parseInt(product.discount) / 100 : 0;
    let price: number, shippingPrice: number;
    e.preventDefault();
    if (!user) {
      setTimeout(() => {
        setError("");
      }, 3000);
      setError(t("logInToAdd"));
    } else if (user) {
      if (!selectedVariation?.id) {
        setTimeout(() => {
          setError("");
        }, 3000);
        setError(t("selectProperties"));
      } else if (selectedVariation.id) {
        price =
          selectedVariation.sku_price && discount
            ? Number(selectedVariation.sku_price) -
              Number(selectedVariation.sku_price) * discount
            : Number(selectedVariation.sku_price);
        shippingPrice = selectedShipping.freight.amount;
        if (selectedVariation.quantity > 0) {
          localStorage.setItem(
            "aeno",
            JSON.stringify([
              {
                productId: product.product_id?.toString(),
                name: product.product_title,
                price: converter(price),
                originalPrice: price,
                imageUrl: selectedVariation.imageUrl
                  ? selectedVariation.imageUrl
                  : product.product_main_image_url,
                properties:
                  selectedVariation.aeop_s_k_u_propertys.aeop_sku_property,
                quantity: selectedVariation.quantity,
                sku: selectedVariation.id,
                carrierId: selectedShipping.service_name,
                shippingPrice: converter(shippingPrice),
                totalPrice:
                  (converter(price + shippingPrice) as number) *
                  selectedVariation.quantity,
              },
            ])
          );
          router.push("/account/orders/new");
        } else {
          setTimeout(() => {
            setError("");
          }, 3000);
          setError("Item is out of stock.");
        }
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
  user,
  setError,
  selectedVariation,
  selectedShipping,
  converter,
}: {
  product: IAffiliateProduct;
  user: IUserRedux;
  setError: any;
  selectedVariation: SelectedVariation | undefined;
  selectedShipping: SelectedShipping;
  converter: (price: number) => number | undefined;
}) => {
  const t = useTranslations("AEProduct");
  const dispatch = useDispatch();
  const addToCartHandler = (e: any) => {
    let discount = product.discount ? parseInt(product.discount) / 100 : 0;
    let price: number, shippingPrice: number;
    e.preventDefault();
    if (!user) {
      setTimeout(() => {
        setError("");
      }, 3000);
      setError(t("logInToAdd"));
    } else if (user) {
      if (!selectedVariation?.id) {
        setTimeout(() => {
          setError("");
        }, 3000);
        setError(t("selectProperties"));
      } else if (selectedVariation.id) {
        price =
          selectedVariation.sku_price && discount
            ? Number(selectedVariation.sku_price) -
              Number(selectedVariation.sku_price) * discount
            : Number(selectedVariation.sku_price);
        shippingPrice = selectedShipping.freight.amount;
        if (selectedVariation.quantity > 0) {
          dispatch(
            addToCart({
              productId: product.product_id?.toString(),
              name: product.product_title,
              price: converter(price),
              originalPrice: price,
              imageUrl: selectedVariation.imageUrl
                ? selectedVariation.imageUrl
                : product.product_main_image_url,
              properties:
                selectedVariation.aeop_s_k_u_propertys.aeop_sku_property,
              quantity: selectedVariation.quantity,
              sku: selectedVariation.id,
              carrierId: selectedShipping.service_name,
              shippingPrice: converter(shippingPrice),
              totalPrice:
                (converter(price + shippingPrice) as number) *
                selectedVariation.quantity,
            })
          );
        } else {
          setTimeout(() => {
            setError("");
          }, 3000);
          setError("Item is out of stock.");
        }
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
  user,
  setError,
  converter,
}: {
  product: IAffiliateProduct;
  user: IUserRedux;
  setError: any;
  converter: (price: number) => number | undefined;
}) => {
  const t = useTranslations("AEProduct");
  const dispatch = useDispatch();

  const addToWishlistHandler = (e: any) => {
    e.preventDefault();
    if (!user) {
      setTimeout(() => {
        setError("");
      }, 3000);
      setError(t("logInToAdd"));
    } else if (user) {
      dispatch(
        addToWishlist({
          productId: product.product_id?.toString(),
          name: product.product_title,
          price: converter(
            product.target_app_sale_price
              ? Number(product.target_app_sale_price)
              : Number(product.target_original_price)
          ),
          imageUrl: product.product_main_image_url,
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
        // action="Login" actionUrl="/auth/login"
        >
          {error}
        </DangerDialog>
      )}
    </>
  );
};
