const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);
const { prisma } = require("../lib/prisma");

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

    // const dataPath = data.path;

    // const supabaseUrl = process.env.SUPABASE_URL +

    // https://pcrierdhvpxvlmydrfty.supabase.co/storage/v1/object/public/odin-file-uploader/I%20was%20on%20the%20road%20crossing.txt

    console.log(data);
    if (error) {
      throw error;
    } else {
      // const { data } = supabase.storage
      // .from("odin-file-uploader")
      // .getPublicUrl(dataPath);

      const folder = await prisma.folder.findFirst({
        where: { userId: req.user.id, cuid: req.params.folderCuid },
      });
      const file = await prisma.file.create({
        data: {
          name: req.file.originalname,
          size: req.file.size,
          url: data.path,
          folderId: folder.id,
        },
      });
      console.log("Created file:", file);
      res.redirect("/");
    }
  },
];

// const avatarFile = event.target.files[0];
// const { data, error } = await supabase.storage
//   .from("odin-file-uploader")
//   .upload("public/avatar1.png", avatarFile, {
//     cacheControl: "3600",
//     upsert: false,
//   });

module.exports = {
  uploadGet,
  uploadPost,
};
