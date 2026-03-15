const { body, validationResult, matchedData } = require("express-validator");
const { prisma } = require("../lib/prisma");

async function getFolders(req, res) {
  if (!req.user) {
    res.render("index", {
      title: "File Uploader",
    });
  } else {
    const userFolders = await prisma.folder.findMany({
      where: { userId: req.user.id },
    });
    res.render("index", {
      title: "File Uploader",
      user: req.user,
      userFolders,
    });
  }
}

function addFolderGet(req, res) {
  if (!req.user) {
    res.render("index", {
      title: "File Uploader",
    });
  } else {
    res.render("forms/addFolder", {
      title: "Create a Folder",
      user: req.user,
    });
  }
}

const lengthErr = "must be between 1 and 40 characters.";
const validateAddFolderPost = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Folder Name ${lengthErr}`),
];

const addFolderPost = [
  validateAddFolderPost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("forms/addFolder", {
        title: "Create a Folder",
        user: req.user,
        errors: errors.array(),
      });
    }
    try {
      const { name } = matchedData(req);
      const folder = await prisma.folder.create({
        data: {
          userId: req.user.id,
          name,
        },
      });
      console.log("Created folder:", folder);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
];

module.exports = {
  getFolders,
  addFolderGet,
  addFolderPost,
};
