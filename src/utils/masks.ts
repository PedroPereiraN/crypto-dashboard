export const numberMask = (
  value: string | number,
  decimals: number,
): string => {
  let num: number;

  if (typeof value === "string") {
    const transformNumberInStringWithoutDecimals = value
      .toString()
      .replace(/\D/g, "");
    const getDividerThatWillBringBackDecimals = Math.pow(10, decimals);

    num =
      parseFloat(transformNumberInStringWithoutDecimals) /
      getDividerThatWillBringBackDecimals;
  } else {
    num = value;
  }

  if (isNaN(num)) {
    return "";
  }

  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
