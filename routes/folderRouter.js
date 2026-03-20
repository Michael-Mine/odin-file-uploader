const { Router } = require("express");
const folderRouter = Router();
const folderController = require("../controllers/folderController");
const uploadController = require("../controllers/uploadController");

folderRouter.get("/:folderCuid", folderController.getFolder);

folderRouter.get("/:folderCuid/share", folderController.shareFolderGet);

folderRouter.get("/:folderCuid/update", folderController.updateFolderGet);
folderRouter.post("/:folderCuid/update", folderController.updateFolderPost);

folderRouter.get("/:folderCuid/delete", folderController.deleteFolderGet);
folderRouter.post("/:folderCuid/delete", folderController.deleteFolderPost);

folderRouter.get("/:folderCuid/upload", uploadController.uploadGet);
folderRouter.post("/:folderCuid/upload", uploadController.uploadPost);

//generate a link - new share model & route?

module.exports = folderRouter;
