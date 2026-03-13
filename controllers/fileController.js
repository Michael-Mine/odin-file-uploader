const { prisma } = require("../lib/prisma");

async function getFile(req, res) {
  const fileId = req.param.fileId;
  const file = await prisma.user.findUnique({
    where: { user: req.user },
  });
  // res.render("file");
}

module.exports = {
  getFile,
};
