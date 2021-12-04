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
