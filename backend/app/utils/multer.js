const multer = require("multer");
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
module.exports = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Chỉ cho phép định dạng .png, .jpg và .jpeg!"));
    }
  },
  limits: { fileSize: 5242880 }, //5mb
});
