const { Router } = require("express");
const indexRouter = Router();

const indexController = require("../controllers/indexController");
const authController = require("../controllers/authController");
const signUpController = require("../controllers/signUpController");

// const formController = require("../controllers/signUpController");
const uploadController = require("../controllers/uploadController");

indexRouter.get("/", indexController.getFolders);

indexRouter.get("/add-folder", indexController.addFolderGet);
// indexRouter.post("/add-folder", formController.addFolderPost);

indexRouter.post("/log-in", authController.logInPost);
indexRouter.get("/log-out", authController.logOutGet);

indexRouter.get("/sign-up", signUpController.signUpGet);
indexRouter.post("/sign-up", signUpController.signUpPost);

//move to folderController?
indexRouter.get("/upload", indexController.uploadGet);
indexRouter.post("/upload", uploadController.uploadPost);

module.exports = indexRouter;
