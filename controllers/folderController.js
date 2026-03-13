const { prisma } = require("../lib/prisma");

async function getFolder(req, res) {
  const folderCuid = req.params.folderCuid;
  console.log(req.user);
  const folder = await prisma.folder.findFirst({
    where: { userId: req.user.id, cuid: folderCuid },
  });
  res.render("folder", {
    title: folder.name,
    user: req.user,
    folder,
  });
}

module.exports = {
  getFolder,
};
