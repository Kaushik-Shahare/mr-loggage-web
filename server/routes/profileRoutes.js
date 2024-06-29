const express = require("express");
const profileRouter = express.Router();
const auth = require("../middlewares/auth");
const {
  editProfileController,
  getProfileController,
} = require("../controllers/profileController");

profileRouter.post("/", auth, getProfileController);
profileRouter.post("/edit-profile", auth, editProfileController);

module.exports = profileRouter;
