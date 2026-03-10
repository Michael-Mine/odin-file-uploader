async function getFiles(req, res) {
  res.render("index", {
    title: "File Uploader",
    user: req.user,
  });
}

function signUpGet(req, res) {
  res.render("forms/signUp", {
    title: "Sign Up",
    user: req.user,
  });
}

function uploadGet(req, res) {
  res.render("forms/upload", {
    title: "Upload File",
    user: req.user,
  });
}

module.exports = {
  getFiles,
  signUpGet,
  uploadGet,
};
