export const generateRandomString = (length: number) => {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const convertTime = (time: number) => {
  const day = Math.floor((time / 10) % 10) * 10 + Math.floor((time / 1) % 10);
  const month =
    Math.floor((time / 1000) % 10) * 10 + Math.floor((time / 100) % 10);
  const year =
    Math.floor((time / 10000000) % 10) * 1000 +
    Math.floor((time / 1000000) % 10) * 100 +
    Math.floor((time / 100000) % 10) * 10 +
    Math.floor((time / 10000) % 10);

  return `${day}/${month}/${year}`;
};

export const LocalISODate = () => {
  let tzoffset = new Date().getTimezoneOffset() * 60000;
  let local = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  let date = local.substring(0, 10) + " " + local.substring(11, 16);
  return date;
};

import axios from "axios";
export const ConvertPrice = async (price: number, exchange: string) => {
  let commission = 0;
  let rate = 0;
  const { data } = await axios.post(
    `${process.env.NEXTAUTH_URL}/api/commission`,
    { exchange }
  );
  commission = data.commission;
  rate = data.rate;
  let newPrice = price * rate + price * rate * commission;
  return newPrice;
};

export const CancelOrderAfterTimer = async (
  user: any,
  id: string,
  timer: number
) => {
  await new Promise((resolve) => setTimeout(resolve, timer));
  const index = user.orders.findIndex(
    (el: any) => el.orderId === id.toString()
  );
  if (index !== -1 && !user.orders[index].payment.isPaymentConfirmed) {
    await axios({
      method: "POST",
      url: "https://api.zapiex.com/v3/order/details",
      headers: {
        "x-api-key": process.env.ZAPIEX_KEY,
        "Content-Type": "application/json",
      },
      data: {
        username: process.env.ALIEXPRESS_USERNAME,
        password: process.env.ALIEXPRESS_PASSWORD,
        orderId: id.toString(),
      },
    })
      .then((response) => {
        let data = response.data.data;
        if (data.canCancel) {
          axios({
            method: "POST",
            url: "https://api.zapiex.com/v3/order/cancel",
            headers: {
              "x-api-key": process.env.ZAPIEX_KEY,
              "Content-Type": "application/json",
            },
            data: {
              username: process.env.ALIEXPRESS_USERNAME,
              password: process.env.ALIEXPRESS_PASSWORD,
              orderId: id.toString(),
            },
          })
            .then(() => {
              user.orders[index] = {
                orderId: id.toString(),
                product: undefined,
                shippingAddress: undefined,
                tracking: undefined,
                payment: { hasTimedOut: true },
              };
              user.save(function (err: any, result: any) {
                if (err) {
                  console.log(err);
                }
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
};

// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCommission,
//   fetchCurrencyRate,
//   IFinance,
//   selectFinance,
// } from "./redux/financeSlice";
// export const LocalCurrencyConverter = (
//   price: number,
//   exchange: "DZDEUR" | "DZDUSD" | "DZDGBP"
// ) => {
//   const dispatch = useDispatch();
//   const { rate, commission }: IFinance = useSelector(selectFinance);
//   let currency: number = 0;
//   if (rate && commission) {
//     const rateIndex = rate.findIndex((c) => c.exchange === exchange);
//     if (rateIndex !== -1) currency = rate[rateIndex].live.parallel.sale;
//     return (
//       Math.ceil((price * currency + price * currency * commission) / 10) * 10
//     );
//   } else {
//     dispatch(fetchCommission());
//     dispatch(fetchCurrencyRate());
//   }
// };
