const { prisma } = require("../lib/prisma");
const { body, validationResult, matchedData } = require("express-validator");

async function getFolder(req, res) {
  if (!req.user) {
    res.status(401).redirect("/");
  } else {
    const folder = await prisma.folder.findFirst({
      where: { userId: req.user.id, cuid: req.params.folderCuid },
    });
    res.render("folder", {
      user: req.user,
      folder,
    });
  }
}

async function updateFolderGet(req, res) {
  if (!req.user) {
    res.status(401).redirect("/");
  } else {
    const folder = await prisma.folder.findFirst({
      where: { userId: req.user.id, cuid: req.params.folderCuid },
    });
    res.render("forms/updateFolder", {
      user: req.user,
      folder,
    });
  }
}

const lengthErr = "must be between 1 and 40 characters.";
const validateUpdateFolderPost = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Folder Name ${lengthErr}`),
];

const updateFolderPost = [
  validateUpdateFolderPost,
  async (req, res, next) => {
    const errors = validationResult(req);

    const folder = await prisma.folder.findFirst({
      where: { userId: req.user.id, cuid: req.params.folderCuid },
    });

    if (!errors.isEmpty()) {
      return res.status(400).render("forms/updateFolder", {
        user: req.user,
        folder,
        errors: errors.array(),
      });
    }
    try {
      const { name } = matchedData(req);

      const updateFolder = await prisma.folder.update({
        where: { id: folder.id },
        data: {
          name,
        },
      });
      console.log("Updated folder:", updateFolder);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
];

async function deleteFolderGet(req, res) {
  if (!req.user) {
    res.status(401).redirect("/");
  } else {
    const folder = await prisma.folder.findFirst({
      where: { userId: req.user.id, cuid: req.params.folderCuid },
    });
    res.render("forms/deleteFolder", {
      user: req.user,
      folder,
    });
  }
}

async function deleteFolderPost(req, res) {
  if (!req.user) {
    res.status(401).redirect("/");
  } else {
    const folder = await prisma.folder.findFirst({
      where: { userId: req.user.id, cuid: req.params.folderCuid },
    });
    const deleteFolder = await prisma.folder.delete({
      where: { id: folder.id },
    });
    console.log("Deleted folder:", deleteFolder);
    res.redirect("/");
  }
}

module.exports = {
  getFolder,
  updateFolderGet,
  updateFolderPost,
  deleteFolderGet,
  deleteFolderPost,
};
