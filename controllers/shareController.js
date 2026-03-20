const { prisma } = require("../lib/prisma");

async function getShareFolder(req, res) {
  const folder = await prisma.folder.findFirst({
    where: { cuid: req.params.folderCuid },
    include: { files: true },
  });
  const date = new Date();
  res.render("openFolder", {
    folder,
    date,
  });
}

module.exports = {
  getShareFolder,
};

// error 404 page
