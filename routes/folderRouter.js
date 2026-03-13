const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

folderRouter.get("/:folderCuid", folderController.getFolder);

module.exports = folderRouter;
