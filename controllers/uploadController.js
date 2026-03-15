const { prisma } = require("../lib/prisma");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

async function uploadGet(req, res) {
  if (!req.user) {
    res.status(401).redirect("/");
  } else {
    const folder = await prisma.folder.findFirst({
      where: { userId: req.user.id, cuid: req.params.folderCuid },
    });
    res.render("forms/upload", {
      user: req.user,
      folder,
    });
  }
}

const uploadPost = [
  (req, res, next) => {
    const uploadFile = upload.single("uploaded_file");
    uploadFile(req, res, next);
  },
  async (req, res) => {
    const folder = await prisma.folder.findFirst({
      where: { userId: req.user.id, cuid: req.params.folderCuid },
    });
    console.log(req.file);
    const file = await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        url: req.file.path,
        folderId: folder.id,
      },
    });
    console.log("Created file:", file);
    res.redirect("/");
  },
];

module.exports = {
  uploadGet,
  uploadPost,
};
