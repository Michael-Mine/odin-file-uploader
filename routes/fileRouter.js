const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");

//read file - get in fileController
fileRouter.get("/:fileId", fileController.getFile);

//update file (change name) - get/post in fileController

//delete file - get/post in fileController

//share file? - get/post in fileController
//generate a link - new share model & route?

module.exports = fileRouter;
