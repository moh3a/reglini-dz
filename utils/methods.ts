export function generateRandomString(length: number) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

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
export const ConvertPrice = async (price: number) => {
  let commission = 0;
  let rate = 0;
  const { data } = await axios.get("http://localhost:3000/api/commission");
  commission = data.data.commission;
  const res = await axios.get("http://localhost:3000/api/currency");
  rate = res.data.data[0].live.parallel.sale;
  let newPrice = price * rate + price * rate * commission;
  return newPrice;
};
