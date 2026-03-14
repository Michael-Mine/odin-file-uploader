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
    console.log(userFolders);

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

function uploadGet(req, res) {
  res.render("forms/upload", {
    title: "Upload File",
    user: req.user,
  });
}

module.exports = {
  getFolders,
  signUpGet,
  addFolderGet,
  uploadGet,
};
