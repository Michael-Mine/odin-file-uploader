const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");

fileRouter.get("/:fileCuid", fileController.getFile);

fileRouter.get("/:fileCuid/update", fileController.updateFileGet);
fileRouter.post("/:fileCuid/update", fileController.updateFilePost);

fileRouter.get("/:fileCuid/delete", fileController.deleteFileGet);
fileRouter.post("/:fileCuid/delete", fileController.deleteFilePost);

module.exports = fileRouter;
