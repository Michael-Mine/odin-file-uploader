const { prisma } = require("../lib/prisma");

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
  }
  // res.render("file");
}

module.exports = {
  getFile,
};
