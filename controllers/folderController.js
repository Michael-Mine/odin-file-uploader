const { prisma } = require("../lib/prisma");

async function getFolder(req, res) {
  const folderId = req.param.folderId;
  const folder = await prisma.user.findUnique({
    where: { username: req.user },
  });
  // res.render("folder");
}

module.exports = {
  getFolder,
};
