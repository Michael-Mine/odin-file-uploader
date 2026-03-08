const db = require("../db/queries");

async function getAllPosts(req, res) {
  const posts = await db.getAllPosts();
  res.render("index", {
    title: "Members Only Board",
    posts,
    user: req.user,
  });
}

function signUpGet(req, res) {
  res.render("forms/signUp", {
    title: "Sign Up",
    user: req.user,
  });
}

function newPostGet(req, res) {
  res.render("forms/newPost", {
    title: "Add New Post",
    user: req.user,
  });
}

function newMemberGet(req, res) {
  res.render("forms/join", {
    title: "Join the Club",
    user: req.user,
  });
}

module.exports = {
  getAllPosts,
  signUpGet,
  newPostGet,
  newMemberGet,
};
