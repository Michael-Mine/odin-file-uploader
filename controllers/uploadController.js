const multer = require("multer");
const storage = multer.memoryStorage();
const { prisma } = require("../lib/prisma.js");
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

async function uploadGet(req, res) {
  if (!req.user) {
    res.status(401).redirect("/");
  } else {
    const folder = await prisma.folder.findFirst({
      where: { userId: req.user.id, cuid: req.params.folderCuid },
    });
    res.render("forms/upload", {
      folder,
    });
  }
}

const upload = multer({ storage: storage, limits: { fileSize: 5242880 } });

const uploadPost = [
  (req, res, next) => {
    const uploadFile = upload.single("uploaded_file");
    uploadFile(req, res, next);
  },
  async (req, res) => {
    console.log(req.file);

    const { data, error } = await supabase.storage
      .from("odin-file-uploader")
      .upload(req.file.originalname, req.file.buffer, {
        cacheControl: "3600",
        upsert: false,
      });

    const dataPath = data.path;

    console.log(data);
    if (error) {
      throw error;
    } else {
      const { data } = supabase.storage
        .from("odin-file-uploader")
        .getPublicUrl(dataPath, {
          download: true,
        });

      const folder = await prisma.folder.findFirst({
        where: { userId: req.user.id, cuid: req.params.folderCuid },
      });
      const file = await prisma.file.create({
        data: {
          name: req.file.originalname,
          size: req.file.size,
          url: data.publicUrl,
          folderId: folder.id,
        },
      });
      console.log("Created file:", file);
      res.redirect("/");
    }
  },
];

module.exports = {
  uploadGet,
  uploadPost,
};
