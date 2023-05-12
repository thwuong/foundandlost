const nowMonth = new Date().getMonth() + 1;
export const convertMonth = (preNumber) => {
  const result = nowMonth - preNumber;
  let month = result;
  if (result < 0) {
    month = result + 12;
  }
  if (result === 13) {
    month = 1;
  }
  if (month == 0) {
    month = 12;
  }

  return month;
};
