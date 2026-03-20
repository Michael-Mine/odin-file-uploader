const { Router } = require("express");
const shareRouter = Router();
const shareController = require("../controllers/shareController");

shareRouter.get("/:folderCuid", shareController.getShareFolder);

module.exports = shareRouter;
