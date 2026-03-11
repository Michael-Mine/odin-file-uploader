const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const uploadPost = [
  (req, res, next) => {
    const uploadFile = upload.single("uploaded_file");
    uploadFile(req, res, next);
  },
  async (req, res) => {
    console.log(req.file);
    res.redirect("/");
  },
];

module.exports = {
  uploadPost,
};
