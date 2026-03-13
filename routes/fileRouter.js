const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");

fileRouter.get("/:fileId", fileController.getFile);

module.exports = fileRouter;
