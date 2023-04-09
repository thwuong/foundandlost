require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const reSizeImage = (id, height, width) => {
  return cloudinary.url(id, {
    height,
    width,
    crop: "scale",
  });
};
const uploadSingle = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    folder: "avatar",
  });
  return {
    url: result.secure_url,
  };
};
const uploadMultiple = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    folder: "post",
  });
  return {
    url: result.secure_url,
  };
};
const removeMultipe = async (image) => {
  const arrTempt = image.split("/");
  const imageName = arrTempt[arrTempt.length - 1];
  let publicId = imageName.split(".")[0];
  await cloudinary.uploader.destroy(publicId, {
    folder: "post",
  });
};

module.exports = {
  uploadSingle,
  uploadMultiple,
};
