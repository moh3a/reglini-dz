export const convertTime = (time: any) => {
  const firstDigit = Math.floor((time / 1) % 10);
  const secondDigit = Math.floor((time / 10) % 10);
  const day = secondDigit * 10 + firstDigit;
  const thridDigit = Math.floor((time / 100) % 10);
  const fourthDigit = Math.floor((time / 1000) % 10);
  const month = fourthDigit * 10 + thridDigit;
  const fifthDigit = Math.floor((time / 10000) % 10);
  const sixthDigit = Math.floor((time / 100000) % 10);
  const seventhDigit = Math.floor((time / 1000000) % 10);
  const eigthDigit = Math.floor((time / 10000000) % 10);
  const year =
    eigthDigit * 1000 + seventhDigit * 100 + sixthDigit * 10 + fifthDigit;

  return `${day}/${month}/${year}`;
};
