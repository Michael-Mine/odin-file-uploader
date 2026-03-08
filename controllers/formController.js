const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

const lengthErr = "must be between 1 and 40 characters.";
const emailErr = "must be an email address";

const validateSignUpPost = [
  body("firstName")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`),
  body("lastName")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`),
  body("username")
    .trim()
    .isEmail()
    .withMessage(`Email ${emailErr}`)
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`)
    .custom(async (value) => {
      const user = await db.checkUserExists(value);
      if (user[0]) {
        throw new Error("Email is already in use");
      }
    }),
  body("password")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`),
  body("password-check").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    } else return true;
  }),
];

const signUpPost = [
  validateSignUpPost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("forms/signUp", {
        title: "Sign Up",
        errors: errors.array(),
      });
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await db.insertUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        hashedPassword,
      });
      res.redirect("/");
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
];

module.exports = {
  signUpPost,
};
