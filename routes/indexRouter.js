const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getFiles);
indexRouter.get("/sign-up", indexController.signUpGet);

// indexRouter.post("/sign-up", formController.signUpPost);

// indexRouter.post("/log-in", passportController.logInPost);
// indexRouter.get("/log-out", passportController.logOutGet);

// indexRouter.get("/upload", indexController.uploadGet);
// indexRouter.post("/upload", formController.uploadPost);

module.exports = indexRouter;
