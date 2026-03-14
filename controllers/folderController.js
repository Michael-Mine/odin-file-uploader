const { prisma } = require("../lib/prisma");

async function getFolder(req, res) {
  if (!req.user) {
    res.status(401).redirect("/");
  } else {
    const folderCuid = req.params.folderCuid;
    const folder = await prisma.folder.findFirst({
      where: { userId: req.user.id, cuid: folderCuid },
    });
    res.render("folder", {
      title: folder.name,
      user: req.user,
      folder,
    });
  }
}

module.exports = {
  getFolder,
};
