export const validationMultipleImage = (files) => {
  let error = "";

  const totalSize = [...files].reduce((preValue, currentValue) => {
    return preValue + currentValue.size;
  }, 0);

  [...files].forEach((file) => {
    if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
      error = "Loại tập tin không được hỗ trợ";
    }
  });
  if (!error) {
    if (totalSize > 5242880) {
      error = "Tệp tin quá lớn";
    }
  }

  return error;
};
