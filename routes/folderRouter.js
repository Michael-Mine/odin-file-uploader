const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

folderRouter.get("/:folderId", folderController.getFolder);

module.exports = folderRouter;
