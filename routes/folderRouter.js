const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");

// read folder - get in folderController
folderRouter.get("/:folderCuid", folderController.getFolder);

//update folder (change name) - get/post in folderController
folderRouter.get("/:folderCuid/update", folderController.updateFolderGet);
folderRouter.post("/:folderCuid/update", folderController.updateFolderPost);

//delete folder - get/post in folderController

//create file (upload) - get/post in folderController?

module.exports = folderRouter;
