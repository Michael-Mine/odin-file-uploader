const { prisma } = require("../lib/prisma");
const { body, validationResult, matchedData } = require("express-validator");

async function getFile(req, res) {
  if (!req.user) {
    res.status(401).redirect("/");
  } else {
    const file = await prisma.folder.findFirst({
      where: { userId: req.user.id },
      include: {
        files: {
          where: {
            cuid: req.params.fileCuid,
          },
        },
      },
    });
    res.render("file", {
      file,
    });
  }
}

async function updateFileGet(req, res) {
  if (!req.user) {
    res.status(401).redirect("/");
  } else {
    const file = await prisma.folder.findFirst({
      where: { userId: req.user.id },
      include: {
        files: {
          where: {
            cuid: req.params.fileCuid,
          },
        },
      },
    });
    res.render("forms/updateFile", {
      file,
    });
  }
}

const lengthErr = "must be between 1 and 40 characters.";
const validateUpdateFilePost = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`File Name ${lengthErr}`),
];

const updateFilePost = [
  validateUpdateFilePost,
  async (req, res, next) => {
    const errors = validationResult(req);

    const file = await prisma.folder.findFirst({
      where: { userId: req.user.id },
      include: {
        files: {
          where: {
            cuid: req.params.fileCuid,
          },
        },
      },
    });

    if (!errors.isEmpty()) {
      return res.status(400).render("forms/updateFile", {
        file,
        errors: errors.array(),
      });
    }
    try {
      const { name } = matchedData(req);

      const updateFile = await prisma.file.update({
        where: { id: file.files[0].id },
        data: {
          name,
        },
      });
      console.log("Updated folder:", updateFile);
      res.redirect("/");
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
];

async function deleteFileGet(req, res) {
  if (!req.user) {
    res.status(401).redirect("/");
  } else {
    const file = await prisma.folder.findFirst({
      where: { userId: req.user.id },
      include: {
        files: {
          where: {
            cuid: req.params.fileCuid,
          },
        },
      },
    });
    res.render("forms/deleteFile", {
      file,
    });
  }
}

async function deleteFilePost(req, res) {
  if (!req.user) {
    res.status(401).redirect("/");
  } else {
    const file = await prisma.folder.findFirst({
      where: { userId: req.user.id },
      include: {
        files: {
          where: {
            cuid: req.params.fileCuid,
          },
        },
      },
    });
    const deleteFile = await prisma.file.delete({
      where: { id: file.files[0].id },
    });
    console.log("Deleted file:", deleteFile);
    res.redirect("/");
  }
}

module.exports = {
  getFile,
  updateFileGet,
  updateFilePost,
  deleteFileGet,
  deleteFilePost,
};
