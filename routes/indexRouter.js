const { Router } = require("express");
const indexRouter = Router();

const indexController = require("../controllers/indexController");
const signUpController = require("../controllers/signUpController");
const formController = require("../controllers/signUpController");
const passportController = require("../controllers/passportController");
const uploadController = require("../controllers/uploadController");

indexRouter.get("/", indexController.getFolders);
indexRouter.get("/sign-up", indexController.signUpGet);

indexRouter.post("/sign-up", signUpController.signUpPost);

indexRouter.post("/log-in", passportController.logInPost);
indexRouter.get("/log-out", passportController.logOutGet);

indexRouter.get("/add-folder", indexController.addFolderGet);
// indexRouter.post("/add-folder", formController.addFolderPost);

indexRouter.get("/upload", indexController.uploadGet);

indexRouter.post("/upload", uploadController.uploadPost);

module.exports = indexRouter;
