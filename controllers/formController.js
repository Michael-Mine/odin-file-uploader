const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

const lengthErr = "must be between 1 and 40 characters.";
const textErr = "must be between 1 and 300 characters.";
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

const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage(`Name ${lengthErr}`),
  body("text")
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage(`Message ${textErr}`),
];

const newPostPost = [
  validatePost,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("forms/newPost", {
        title: "Add New Post",
        user: req.user,
        errors: errors.array(),
      });
    }
    const { title, text } = matchedData(req);
    const added = new Date();
    const userID = req.user.id;
    await db.insertPost({ title, text, added, userID });
    res.redirect("/");
  },
];

const validateNewMember = [
  body("password").custom((value, { req }) => {
    if (value !== process.env.MEMBER_PASS) {
      throw new Error("Password is incorrect");
    } else return true;
  }),
];

const newMemberPost = [
  validateNewMember,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("forms/join", {
        title: "Join the Club",
        user: req.user,
        errors: errors.array(),
      });
    }
    const userID = req.user.id;
    await db.changeToMember(userID);
    res.redirect("/");
  },
];

const validateNewAdmin = [
  body("password").custom((value, { req }) => {
    if (value !== process.env.ADMIN_PASS) {
      throw new Error("Password is incorrect");
    } else return true;
  }),
];

const postNewAdmin = [
  validateNewAdmin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("forms/join", {
        title: "Join the Club",
        user: req.user,
        errors: errors.array(),
      });
    }
    const userID = req.user.id;
    await db.changeToAdmin(userID);
    res.redirect("/");
  },
];

async function postDeletePost(req, res) {
  const postID = req.body.postID;
  console.log(req.body);
  await db.deletePost(postID);
  res.redirect("/");
}

module.exports = {
  signUpPost,
  newPostPost,
  newMemberPost,
  postNewAdmin,
  postDeletePost,
};
