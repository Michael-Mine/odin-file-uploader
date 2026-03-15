const { Router } = require("express");
const indexRouter = Router();

const indexController = require("../controllers/indexController");
const authController = require("../controllers/authController");
const signUpController = require("../controllers/signUpController");

indexRouter.get("/", indexController.getFolders);

indexRouter.get("/add-folder", indexController.addFolderGet);
indexRouter.post("/add-folder", indexController.addFolderPost);

indexRouter.post("/log-in", authController.logInPost);
indexRouter.get("/log-out", authController.logOutGet);

indexRouter.get("/sign-up", signUpController.signUpGet);
indexRouter.post("/sign-up", signUpController.signUpPost);

module.exports = indexRouter;
